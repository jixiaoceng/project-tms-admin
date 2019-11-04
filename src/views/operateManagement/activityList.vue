<template>
  <div class="student-wrap">
    <screen-wrapper @search="search">
      <screen-item label="用户账号">
        <el-input v-model.trim="screenData.student_name" placeholder="请输入充值用户账号" @keyup.enter.native="search" />
      </screen-item>
    </screen-wrapper>
    <!-- 表格 -->
    <custom-card title="数据列表" class="table-wrapper">
      <div slot="header-right">
        <el-button type="primary" @click="foundsGroup()">创建团链接</el-button>
      </div>
      <el-table
        v-loading="loading"
        :data="tableData"
        tooltip-effect="dark"
        :border="true"
        style="width: 100%"
        :height="tableHeight"
      >
        <el-table-column align="center" label="序号" :width="50">
          <template slot-scope="scope">{{ (screenData.page - 1) * screenData.page_size + scope.$index + 1 }}</template>
        </el-table-column>
        <el-table-column align="center" label="团编号">
          <template slot-scope="scope">
            <el-button type="text" @click="groupInfo(scope.row.id, scope.row.group_code)">{{ scope.row.group_code }}</el-button>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="group_url" label="团链接" />
        <el-table-column align="center" prop="create_user" label="团创建人" />
        <el-table-column align="center" prop="start_time" label="团创建时间" />
        <el-table-column align="center" prop="present_amount" label="团充值课时" />
        <el-table-column align="center" prop="remain_amount" label="成团剩余课时" />
        <el-table-column align="center" prop="student_number" label="团人数" />
        <el-table-column align="center" prop="remain_time" label="成团剩余时间" />
        <el-table-column align="center" prop="group_status" label="团状态" />
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-button
              v-if="scope.row.reward_status == 0"
              type="text"
              @click="awardFun(scope.row.id)"
            >发放奖励</el-button>
            <span v-else>奖励已发放</span>
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
    <!-- 发放奖励确认弹框 -->
    <el-dialog
      title="发放奖励"
      :visible.sync="grantVisible"
      width="500px"
      center
    >
      <span>发放奖励后该团关闭，链接失效，确定发放奖励吗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="grantVisible = false">暂不发放</el-button>
        <el-button type="primary" @click="grantFun">确定发放</el-button>
      </span>
    </el-dialog>
    <!-- 团信息 -->
    <el-dialog :title="group_title" :visible.sync="dialogGroupInfo">
      <el-table :data="gridData" :border="true">
        <el-table-column align="center" prop="username" label="团员账号" />
        <el-table-column align="center" prop="amount" label="充值课时" />
        <el-table-column align="center" prop="recharge_time" label="充值时间" />
        <el-table-column align="center" prop="order" label="订单编号" />
        <el-table-column align="center" prop="email" label="邮箱" />
        <el-table-column align="center" prop="top_up_sum" label="充值次数" />
        <el-table-column align="center" prop="course_adviser" label="课程顾问" />
        <el-table-column align="center" prop="learn_manager" label="学管" />
        <el-table-column align="center" prop="currency" label="币种" />
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import { managerGroupActivity, managerGroupActivityAdd, managerGroupMember, managerGroupProvideReward } from '@/api/operateManagement/'
export default {
  data() {
    return {
      screenData: {
        student_name: '', // 充值成员账号
        page: 1,
        page_size: 50
      },
      labelWidth: '80',
      grantVisible: false,
      loading: true, // 加载loading
      closeAdviser: false,
      // 一共多少页
      total: 0,
      tableHeight: window.innerHeight - 200 || 300,
      grantItem: '', // 要发放的内容
      // 表格数据
      tableData: [],
      group_title: '',
      gridData: [],
      dialogGroupInfo: false
    }
  },
  mounted() {
    this.getTableDate()
  },
  methods: {
    // 筛选
    search() {
      this.screenData.page = 1
      this.getTableDate()
    },
    // 表格数据
    getTableDate() {
      this.loading = true
      // 请求的接口的位置
      managerGroupActivity(this.screenData).then(res => {
        this.loading = false
        this.total = res.data.count
        this.tableData = res.data.results
      })
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
    // 发放奖励
    awardFun(id) {
      this.grantVisible = true
      this.grantItem = id
    },
    grantFun() {
      // 请求的接口的位置
      managerGroupProvideReward(this.grantItem).then(res => {
        this.grantVisible = false
        this.$message({
          message: res.data.message,
          type: 'success'
        })
        this.getTableDate()
      })
    },
    // 创建团
    foundsGroup() {
      // 请求的接口的位置
      managerGroupActivityAdd().then(res => {
        this.$message({
          message: '创建成功',
          type: 'success'
        })
        this.getTableDate()
      })
    },
    // 团详细信息
    groupInfo(group_id, group_code) {
      this.group_title = `团编号${group_code}`
      this.dialogGroupInfo = true
      // 请求的接口的位置
      managerGroupMember(group_id).then(res => {
        this.gridData = res.data.data
      })
    }
  }
}
</script>

