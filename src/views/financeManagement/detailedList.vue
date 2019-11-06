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
          style="margin-left:10px;width:200px;"
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
            v-for="(item,index) in role"
            :key="index"
            :label="item.realname"
            :value="item.id"
          />
        </el-select>
      </screen-item>
    </screen-wrapper>
    <!-- 表格 -->
    <custom-card title="数据列表" class="table-wrapper">
      <div slot="header-right" class="slot-tit">
        统计期内新用户充值课时 {{ new_student_amount }}；老用户充值课时 {{ old_student_amount }}
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
        <el-table-column align="center" prop="created_on" label="交易时间" sortable="custom" :class-name="getSortClass('created_on')" width="140" />
        <el-table-column align="center" label="学生用户名" width="100">
          <template slot-scope="scope">
            <el-button type="text">
              <router-link :to="{ path : `/studentManagement/studentInfo`, query:{ studentId:scope.row.student.student_id }}">
                {{ scope.row.student.student_name }}
              </router-link>
            </el-button>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="transaction_type" label="交易类型" />
        <el-table-column align="center" prop="amount" label="充值课时" />
        <el-table-column align="center" prop="bonus" label="赠课" />
        <el-table-column align="center" prop="activity.discount_name" label="充值活动" />
        <el-table-column align="center" prop="activity.activity_name" label="活动优惠" />
        <el-table-column align="center" prop="activity.coupon_code" label="优惠码" />
        <el-table-column align="center" prop="activity.redeem_code" label="课程卡" />
        <el-table-column align="center" prop="activity.valid_date" label="有效期" />
        <el-table-column align="center" label="版本">
          <template slot-scope="scope">
            <span v-if="scope.row.course_info.programme_name">
              {{ scope.row.course_info.programme_name == 'Advanced' ? '高级版' : scope.row.course_info.programme_name == 'International Lite' ? '国际版' : 'SG' }}
            </span>
            <span v-else>---</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="级别">
          <template slot-scope="scope">
            <span v-if="scope.row.course_info.course_level">
              Level{{ scope.row.course_info.course_level }}
            </span>
            <span v-else>---</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="recharge_count" label="充值次数" />
        <el-table-column align="center" prop="course_adviser" label="本次充值课程顾问" />
        <el-table-column align="center" prop="learn_manager" label="本次充值学管老师" />
        <el-table-column align="center" prop="activity.order_no" label="流水号" width="260" />
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
import { managerRecharge, attendRecharge } from '@/api/financeManagement'
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
        page_size: 50,
        ordering: '-created_on'
      },
      role: [],
      applyDate: [],
      loading: true, // 加载loading
      total: 0,
      // 表格数据
      tableData: [],
      new_student_amount: 0, // 新用户充值
      old_student_amount: 0 // 老用户充值
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
      this.screenData.start_time = ''
      this.screenData.end_time = ''
    },
    // 表格数据
    getTableDate() {
      this.loading = true
      managerRecharge(this.screenData).then(res => {
        this.loading = false
        this.total = res.data.count
        this.tableData = res.data.results
      })
    },
    timeChange() {
      if (this.applyDate) {
        this.screenData.start_time = this.applyDate[0]
        this.screenData.end_time = this.applyDate[1]
        this.screenData.month_query = ''
      } else {
        this.screenData.start_time = null
        this.screenData.end_time = null
        this.screenData.month_query = 1
      }
    },
    // 充值总数
    getAdhoc() {
      const { month_query, start_time, end_time, cms_user_id } = this.screenData
      const params = { month_query, start_time, end_time, cms_user_id }
      attendRecharge(params).then(res => {
        this.new_student_amount = res.data.data.new_student_amount
        this.old_student_amount = res.data.data.old_student_amount
      })
    },
    // 获取当前页码
    getCurrentPage(currentPage) {
      this.screenData.page = currentPage
      this.getTableDate()
    },
    optionSdviser() {
      managerUser().then(res => {
        this.role = res.data.data
      })
    },
    // 改变每页展示数据的条数
    getPerPage(perPage) {
      this.screenData.page_size = perPage
      this.screenData.page = 1
      this.getTableDate()
    },
    sortChange(column) {
      if (column.prop === 'created_on' && column.order === 'ascending') { // 升序
        this.screenData.ordering = 'created_on'
      } else if (column.prop === 'created_on' && column.order === 'descending') { // 降序
        this.screenData.ordering = '-created_on'
      } else {
        return
      }
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
