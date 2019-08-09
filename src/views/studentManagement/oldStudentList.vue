<template>
  <div class="student-wrap">
    <screen-wrapper @search="search">
      <screen-item label="来源" :part="4" :label-width="labelWidth">
        <el-select v-model="screenData.source" placeholder="请选择">
          <el-option
            v-for="item in sourceOption"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </screen-item>
      <screen-item label="版本" :part="4" :label-width="labelWidth">
        <el-select v-model="screenData.programme_name" placeholder="请选择">
          <el-option
            v-for="item in programmeOption"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </screen-item>
      <screen-item label="级别" :part="4" :label-width="labelWidth">
        <el-select v-model="screenData.course_level" placeholder="请选择">
          <el-option
            v-for="item in courseOption"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </screen-item>
      <screen-item label="学生用户名" :part="4" :label-width="labelWidth">
        <el-input v-model="screenData.student_name" placeholder="请输入学生用户名" />
      </screen-item>
    </screen-wrapper>
    <!-- 表格 -->
    <custom-card title="数据列表" class="table-wrapper">
      <el-table
        :data="tableData"
        tooltip-effect="dark"
        :border="true"
        style="width: 100%"
      >
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
            {{ scope.row.course_info.programme_name == 'Advanced' ? '高级版' : '国际版' }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="级别">
          <template slot-scope="scope">
            Level{{ scope.row.course_info.course_level }}
          </template>
        </el-table-column>
        <el-table-column align="center" prop="virtual_class_sum" label="已学课时" />
        <el-table-column align="center" prop="balance_count" label="账户余额" />
        <el-table-column align="center" prop="smallclass_count" label="小班课余额" />
        <el-table-column align="center" prop="last_info.last_attend_time" label="最近上课时间" />
        <el-table-column align="center" prop="last_info.last_teacher" label="最近上课老师" />
        <el-table-column align="center" prop="next_info.next_attend_time" label="下次上课时间" />
        <el-table-column align="center" prop="next_info.next_teacher" label="下次上课老师" />
        <el-table-column align="center" prop="lesson_sum.lesson_sum" label="本月上课次数" />
        <el-table-column align="center" prop="last_remark" label="距离上次备注时间" />
      </el-table>
    </custom-card>
    <!-- 分页 -->
    <custom-pagination
      :total="total"
      :current-page="currentPage"
      @getCurrentPage="getCurrentPage"
      @getPerPage="getPerPage"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      screenData: {
        source: '', // 来源
        programme_name: '', // 版本 Advanced高级 国际International Lite
        student_name: '', // 学生姓名
        course_level: '', // 1-6
        ordering: '', // 按上课时间排序
        balance_count: '' // 排序 账户余额，virtual_class_sum 已学课时，smallclass_count 小班课余额
      },
      labelWidth: '80',
      sourceOption: [
        {
          value: '',
          label: '全部'
        },
        {
          value: '1',
          label: '直接用户'
        },
        {
          value: '2',
          label: '转介绍'
        },
        {
          value: '3',
          label: '城市合伙人'
        },
        {
          value: '4',
          label: '微信朋友圈广告'
        },
        {
          value: '5',
          label: 'Facebook 广告'
        },
        {
          value: '6',
          label: 'Instagram 广告'
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
          value: 'International Lite',
          label: '国际版'
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
      // 当前页
      currentPage: 1,
      // 一共多少页
      total: 0,
      // 每页多少数据
      perPage: 10,
      // 表格数据
      tableData: [
        {
          'id': 16,
          'username': 'Jeremy.Yao',
          'balance_count': 4551.0,
          'smallclass_count': 0,
          'virtual_class_sum': 76.0,
          'course_info': {
            'course_name': 'NN L2',
            'course_level': 2,
            'programme_name': 'Advanced'
          },
          'last_info': {
            'last_teacher': 'Diana.Chen',
            'last_attend_time': '2019-07-14 00:30:00'
          },
          'next_info': {
            'next_teacher': 'caoyoo',
            'next_attend_time': '2016-12-30 07:00:00'
          },
          'last_remark': null,
          'lesson_sum': {
            'lesson_sum': 0.0
          }
        },
        {
          'id': 94,
          'username': 'zhangsiyuan',
          'balance_count': 2025.0,
          'smallclass_count': 0,
          'virtual_class_sum': 81.0,
          'course_info': {
            'course_name': 'NN L4',
            'course_level': 4,
            'programme_name': 'Advanced'
          },
          'last_info': {
            'last_teacher': '马诗睿',
            'last_attend_time': '2019-02-01 11:00:00'
          },
          'next_info': {
            'next_teacher': 'MsZou',
            'next_attend_time': '2017-02-09 11:00:00'
          },
          'last_remark': null,
          'lesson_sum': 0
        }
      ]
    }
  },
  mounted() {
  },
  methods: {
    // 筛选
    search() {
    },
    // 获取当前页码
    getCurrentPage(currentPage) {
      this.currentPage = currentPage
      // this.getTableData()
    },
    // 改变每页展示数据的条数
    getPerPage(perPage) {
      this.perPage = perPage
      this.currentPage = 1
      // this.getTableData()
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
</style>
