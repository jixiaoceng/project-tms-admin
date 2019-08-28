<template>
  <div class="student-wrap">
    <screen-wrapper @search="search">
      <screen-item label="来源">
        <el-select v-model="screenData.source" placeholder="请选择">
          <el-option
            v-for="item in sourceOption"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </screen-item>
      <screen-item label="状态">
        <el-select v-model="screenData.student_status" placeholder="请选择">
          <el-option
            v-for="item in studentStatusOption"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </screen-item>
      <screen-item label="版本">
        <el-select v-model="screenData.programme_name" placeholder="请选择">
          <el-option
            v-for="item in programmeOption"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </screen-item>
      <screen-item label="级别">
        <el-select v-model="screenData.course_level" placeholder="请选择">
          <el-option
            v-for="item in courseOption"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </screen-item>
      <screen-item label="学生用户名">
        <el-input v-model.trim="screenData.student_name" placeholder="请输入学生用户名" @keyup.enter.native="search" />
      </screen-item>
    </screen-wrapper>
    <!-- 表格 -->
    <custom-card title="数据列表" class="table-wrapper">
      <div slot="header-right">
        <el-button type="primary" @click="batchAll()">批量分配</el-button>
      </div>
      <el-table
        v-loading="loading"
        :data="tableData"
        tooltip-effect="dark"
        :border="true"
        style="width: 100%"
        :default-sort="{prop: 'date', order: 'descending'}"
        @sort-change="sortChange"
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          type="selection"
          width="40"
        />
        <el-table-column align="center" label="序号" :width="50">
          <template slot-scope="scope">{{ (currentPage - 1) * perPage + scope.$index + 1 }}</template>
        </el-table-column>
        <el-table-column align="center" prop="username" label="学生用户名">
          <template slot-scope="scope">
            <router-link :to="{ path : `studentInfo`, query:{ studentId:scope.row.id }}">
              <el-button type="text">{{ scope.row.username }}</el-button>
            </router-link>
          </template>
        </el-table-column>
        <!-- <el-table-column align="center" prop="" label="时区" /> -->
        <el-table-column align="center" label="版本">
          <template slot-scope="scope">
            <span v-if="scope.row.course_info">
              {{ scope.row.course_info.programme_name == 'Advanced' ? '高级版' : scope.row.course_info.programme_name == 'International Lite' ? '国际版' : 'SG' }}
            </span>
            <span v-else>---</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="级别">
          <template slot-scope="scope">
            <span v-if="scope.row.course_info">
              Level{{ scope.row.course_info.course_level }}
            </span>
            <span v-else>---</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="virtual_class_sum"
          sortable="custom"
          :class-name="getSortClass('virtual_class_sum')"
          label="已学课时"
        />
        <el-table-column
          align="center"
          prop="balance_count"
          sortable="custom"
          :class-name="getSortClass('balance_count')"
          label="账户余额"
        />
        <el-table-column
          align="center"
          prop="smallclass_count"
          sortable="custom"
          :class-name="getSortClass('smallclass_count')"
          label="小班课余额"
        />
        <el-table-column align="center" prop="user_status" label="当前状态">
          <template slot-scope="scope">
            <span :class="scope.row.user_status === '已预约试听' ? 'red': scope.row.user_status === '已试听' ? 'orange' : ''">
              {{ scope.row.user_status }}
            </span>
          </template>
        </el-table-column>
        <!-- <el-table-column align="center" prop="" label="当前状态时间" /> -->
        <el-table-column align="center" prop="student_source" label="来源" />
        <el-table-column align="center" prop="course_adviser.name" label="课程顾问" />
        <el-table-column align="center" label="版本">
          <template slot-scope="scope">
            <el-button v-if="!scope.row.course_adviser" type="text" @click="endAdviser(scope.row.id)">分配</el-button>
            <el-button v-else type="text" @click="againAdviser(scope.row.id, scope.row.course_adviser.id)">重新分配</el-button>
          </template>
        </el-table-column>
      </el-table>
    </custom-card>
    <!-- 分页 -->
    <custom-pagination
      :total="total"
      :current-page="currentPage"
      @getCurrentPage="getCurrentPage"
      @getPerPage="getPerPage"
    />
    <el-dialog title="分配课程顾问" :visible.sync="closeAdviser" width="30%">
      <el-form>
        <el-form-item label="课程顾问">
          <el-select v-model="adviserSubmit.course_adviser_id" placeholder="请选择课程顾问">
            <el-option
              v-for="item in adviserDate"
              :key="item.id"
              :label="item.realname"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item class="btn-wrapper text-center">
          <el-button @click="closeAdviser = false">取消</el-button>
          <el-button type="primary" @click="submitAdviser">确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { managerStudent, managerUser, distributAdviser, changeAdviser } from '@/api/classManagement/'
export default {
  data() {
    return {
      screenData: {
        source: '', // 来源
        student_status: '', // 状态
        programme_name: '', // 版本 Advanced高级 国际International Lite
        student_name: '', // 学生姓名
        course_level: '', // 1-6
        page_size: '20',
        page: '1',
        ordering: '-date_joined' // 按上课时间排序
      },
      labelWidth: '80',
      loading: true, // 加载loading
      sourceOption: [
        {
          value: '',
          label: '全部'
        },
        {
          value: 'direct',
          label: '直接用户'
        },
        {
          value: 'referer',
          label: '转介绍'
        },
        {
          value: 'ambassador',
          label: '城市合伙人'
        }
      ],
      programmeOption: [
        {
          value: '',
          label: '全部'
        },
        {
          value: 'Advanced',
          label: '高级版'
        },
        {
          value: 'International',
          label: '国际版'
        },
        {
          value: 'SG',
          label: 'SG'
        }
      ],
      courseOption: [
        {
          value: '',
          label: '全部'
        },
        {
          value: '1',
          label: 'Level1'
        },
        {
          value: '2',
          label: 'Level2'
        },
        {
          value: '3',
          label: 'Level3'
        },
        {
          value: '4',
          label: 'Level4'
        },
        {
          value: '5',
          label: 'Level5'
        },
        {
          value: '6',
          label: 'Level6'
        }
      ],
      studentStatusOption: [
        {
          value: '',
          label: '全部'
        },
        {
          value: 'register',
          label: '已注册'
        },
        {
          value: 'appointment',
          label: '已预约试听'
        },
        {
          value: 'audited',
          label: '已试听'
        },
        {
          value: 'recharged',
          label: '已充值'
        }
      ],
      closeAdviser: false,
      // 当前页
      currentPage: 1,
      // 一共多少页
      total: 0,
      // 每页多少数据
      perPage: 20,
      // 表格数据
      tableData: [],
      adviserDate: [],
      multipleSelection: [],
      adviserSubmit: {
        student_ids: [],
        course_adviser_id: ''
      },
      adviserId: ''
    }
  },
  mounted() {
    this.getTableDate()
    this.optionSdviser()
  },
  methods: {
    // 筛选
    search() {
      this.currentPage = 1
      this.screenData.page = 1
      this.getTableDate()
    },
    // 表格数据
    getTableDate() {
      this.loading = true
      managerStudent(this.screenData).then(res => {
        this.loading = false
        this.total = res.data.count
        this.tableData = res.data.results
      })
    },
    // 获取当前页码
    getCurrentPage(currentPage) {
      this.screenData.page = currentPage
      this.currentPage = currentPage
      this.getTableDate()
    },
    // 改变每页展示数据的条数
    getPerPage(perPage) {
      this.screenData.page_size = perPage
      this.perPage = perPage
      this.screenData.page = 1
      this.getTableDate()
    },
    sortChange(column) {
      if (column.order === 'ascending') { // 升序
        this.screenData.ordering = column.prop
      } else if (column.order === 'descending') { // 降序
        this.screenData.ordering = '-' + column.prop
      } else {
        return
      }
      this.getTableDate()
    },
    getSortClass(key) {
      const sort = this.screenData.ordering
      return sort === `${key}`
        ? 'ascending'
        : sort === `-${key}`
          ? 'descending'
          : ''
    },
    endAdviser(id) {
      this.closeAdviser = true
      this.adviserSubmit.course_adviser_id = ''
      if (id) {
        this.adviserSubmit.student_ids.push(id)
      }
      this.optionSdviser()
    },
    optionSdviser() {
      managerUser('course_adviser').then(res => {
        this.adviserDate = res.data.data
      })
    },
    againAdviser(id, adviser) {
      this.adviserSubmit.student_ids = id
      this.adviserSubmit.course_adviser_id = adviser
      this.adviserId = adviser
      this.closeAdviser = true
    },
    // 提交分配
    submitAdviser() {
      if (this.adviserId) {
        if (this.adviserId === this.adviserSubmit.course_adviser_id) {
          this.$message({
            message: '请选择要重新分配的课程顾问',
            type: 'warning'
          })
        } else {
          changeAdviser(this.adviserSubmit.student_ids, this.adviserSubmit.course_adviser_id).then(res => {
            this.closeAdviser = false
            this.$message({
              message: '分配成功',
              type: 'success'
            })
            this.getTableDate()
          })
        }
      } else {
        this.addAdvisers()
      }
    },
    addAdvisers() {
      distributAdviser(this.adviserSubmit).then(res => {
        this.closeAdviser = false
        this.$message({
          message: '分配成功',
          type: 'success'
        })
        this.getTableDate()
      })
    },
    handleSelectionChange(val) {
      this.adviserSubmit.student_ids = val.map(item => (item.id))
    },
    // 批量分配
    batchAll() {
      this.adviserSubmit.course_adviser_id = ''
      this.closeAdviser = true
    }
  }
}
</script>

<style lang="scss" scoped>
.student-wrap {
  .type-btn {
    padding: 20px 0;
  }
}
.table-wrapper {
  margin-top: 20px;
}
.red{
    color:#f00;
}
.orange{
    color:#e6a23c;
}
</style>
