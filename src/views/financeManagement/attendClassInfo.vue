<!--
 * @Descripttion:
 * @version:
 * @Author: fangli.ji
 * @Date: 2019-08-23 11:27:41
 * @LastEditors: fangli.ji
 * @LastEditTime: 2019-08-23 17:32:13
 -->
<template>
  <div class="scheduling-wrap">
    <screen-wrapper @search="search">
      <screen-item label="日期" :part="2" label-width="80">
        <el-radio-group v-model="screenData.month_query" @change="changeRadion">
          <el-radio-button label="before_month">上月</el-radio-button>
          <el-radio-button label="this_month">本月</el-radio-button>
        </el-radio-group>
        <el-date-picker
          v-model="applyDate"
          style="margin-left:10px;"
          type="daterange"
          value-format="yyyy-MM-dd"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          size="small"
          @change="timeChange"
        />
      </screen-item>
      <screen-item label="按员工查看" :part="2">
        <el-select v-model="screenData.cms_user_id" placeholder="请选择">
          <el-option
            v-for="item in learnmanagerrDate"
            :key="item.id"
            :label="item.realname"
            :value="item.id"
          /></el-select>
      </screen-item>
    </screen-wrapper>
    <!-- 表格 -->
    <custom-card title="数据列表" class="table-wrapper">
      <div slot="header-right" class="slot-tit">
        统计期内新用户课消 {{ old_student_amount }}；老用户课消 {{ old_student_amount }}
      </div>
      <el-table
        v-loading="loading"
        :data="tableData"
        tooltip-effect="dark"
        :border="true"
        style="width: 100%"
        :default-sort="{prop: 'date', order: 'descending'}"
        @sort-change="sortChange"
      >
        <el-table-column align="center" label="序号" :width="50">
          <template slot-scope="scope">{{ (screenData.page - 1) * screenData.page_size + scope.$index + 1 }}</template>
        </el-table-column>
        <el-table-column align="center" prop="virtualclass.scheduled_time" sortable="custom" :class-name="getSortClass('virtualclass.scheduled_time')" label="上课时间" />
        <el-table-column align="center" label="学生用户名" width="100">
          <template slot-scope="scope">
            <el-button type="text">
              <router-link :to="{ path : `/studentManagement/studentInfo`, query:{ studentId:scope.row.student.student_id }}">
                {{ scope.row.student.student_name }}
              </router-link>
            </el-button>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="transaction_type" label="消耗课时类型" />
        <el-table-column align="center" prop="amount" label="消耗课时" />
        <el-table-column align="center" prop="lesson_sum" label="第几次上课" />
        <el-table-column align="center" label="班型">
          <template slot-scope="scope">
            <span>
              {{ scope.row.virtualclass.class_type == 'oneonone' ? '一对一' : '小班课' }}
            </span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="版本">
          <template slot-scope="scope">
            <span>
              {{ scope.row.virtualclass.course_info.programme_name == 'Advanced' ? '高级版' : scope.row.virtualclass.course_info.programme_name == 'International Lite' ? '国际版' : 'SG' }}
            </span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="级别">
          <template slot-scope="scope">
            <span>
              Level {{ scope.row.virtualclass.course_info.course_level }}
            </span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="上课进度">
          <template slot-scope="scope">
            <span>
              Lesson {{ scope.row.virtualclass.course_info.session_no }}
            </span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="virtualclass.teacher_name" label="老师" />
        <el-table-column align="center" prop="remarks" label="备注" />
        <el-table-column align="center" prop="course_adviser" label="本次课消课程顾问" />
        <el-table-column align="center" prop="learn_manager" label="本次课消学管老师" />
      </el-table>
      <!-- 分页 -->
      <custom-pagination
        :total="total"
        :current-page="screenData.page"
        @getCurrentPage="getCurrentPage"
        @getPerPage="getPerPage"
      />
    </custom-card>
  </div>
</template>

<script>
import { attendClassInfo, managerAdhoc } from '@/api/financeManagement'
import { managerUser } from '@/api/classManagement/'
export default {
  data() {
    return {
      screenData: {
        month_query: 'before_month', // this_month 本月，before_month 上月
        start_time: '', // 时间段start_time  2019-07-24 12:00:00 end_time  2019-07-24 12:00:00
        end_time: '',
        cms_user_id: '',
        page: 1,
        page_size: 20,
        ordering: '-created_on'
      },
      learnmanagerrDate: [],
      applyDate: [],
      loading: true, // 加载loading
      total: 0,
      // 表格数据
      tableData: [],
      new_student_amount: 0, // 新用户消课
      old_student_amount: 0 // 老用户消课
    }
  },
  mounted() {
    this.getTableDate()
    this.optionSdviser()
    this.getAdhoc()
  },
  methods: {
    // 筛选
    search() {
      this.screenData.page = 1
      this.getTableDate()
      this.getAdhoc()
    },
    // 日期切换
    changeRadion(val) {
      this.applyDate = []
    },
    // 表格数据
    getTableDate() {
      this.loading = true
      attendClassInfo(this.screenData).then(res => {
        this.loading = false
        this.total = res.data.count
        this.tableData = res.data.results
      })
    },
    timeChange() {
      if (this.applyDate) {
        this.screenData.start_time = this.applyDate[ 0 ]
        this.screenData.end_time = this.applyDate[ 1 ]
        this.screenData.month_query = ''
      } else {
        this.screenData.start_time = null
        this.screenData.end_time = null
        this.screenData.month_query = 1
      }
    },
    // 课消总数
    getAdhoc() {
      const { month_query, start_time, end_time, cms_user_id } = this.screenData
      const params = { month_query, start_time, end_time, cms_user_id }
      managerAdhoc(params).then(res => {
        this.new_student_amount = res.data.data.new_student_amount
        this.old_student_amount = res.data.data.old_student_amount
      })
    },
    optionSdviser() {
      managerUser('learn_manager').then(res => {
        this.learnmanagerrDate = res.data.data
      })
    },
    sortChange(column) {
      if (column.prop === 'virtualclass.scheduled_time' && column.order === 'ascending') { // 升序
        this.screenData.ordering = 'created_on'
      } else if (column.prop === 'virtualclass.scheduled_time' && column.order === 'descending') { // 降序
        this.screenData.ordering = '-created_on'
      } else {
        return
      }
      this.getTableDate()
    },
    // 获取当前页码
    getCurrentPage(currentPage) {
      this.screenData.page = currentPage
      this.getTableDate()
    },
    // 改变每页展示数据的条数
    getPerPage(perPage) {
      this.screenData.page_size = perPage
      this.screenData.page = 1
      this.getTableDate()
    },
    getSortClass: function(key) {
      const sort = this.screenData.ordering
      return sort === `${key}`
        ? 'ascending'
        : sort === `-${key}`
          ? 'descending'
          : ''
    }
  }
}
</script>

<style lang="scss" scoped>
  .type-btn {
    padding: 20px 0 0 0;
  }
  .table-wrapper{
    margin-top:20px;
    .slot-tit{
      color:#666;
      font-size:14px;
    }
  }
</style>
