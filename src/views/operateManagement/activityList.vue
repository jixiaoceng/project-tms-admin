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
          <template slot-scope="scope">{{ (currentPage - 1) * perPage + scope.$index + 1 }}</template>
        </el-table-column>
        <el-table-column align="center" prop="group_number" label="团编号" />
        <el-table-column align="center" label="团编号">
          <template slot-scope="scope">
            <el-button type="text" @click="groupInfo(scope.row.group_number)">{{ scope.row.group_number }}</el-button>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="group_link" label="团链接" />
        <el-table-column align="center" prop="founder" label="团创建人" />
        <el-table-column align="center" prop="creation_time" label="团创建时间" />
        <el-table-column align="center" prop="recharge_point" label="团充值课时" />
        <el-table-column align="center" prop="surplus_point" label="成团剩余课时" />
        <el-table-column align="center" prop="regiment_num" label="团人数" />
        <el-table-column align="center" prop="remaining_time" label="成团剩余时间" />
        <el-table-column align="center" prop="group_state" label="团状态" />
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="awardFun(scope.row)">发放奖励</el-button>
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
        <el-table-column align="center" prop="group_name" label="团员账号" />
        <el-table-column align="center" prop="recharge_points" label="充值课时" />
        <el-table-column align="center" prop="recharge_time" label="充值时间" />
        <el-table-column align="center" prop="order_number" label="订单编号" />
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      screenData: {
        userName: '' // 充值成员账号
      },
      labelWidth: '80',
      grantVisible: false,
      loading: true, // 加载loading
      closeAdviser: false,
      // 当前页
      currentPage: 1,
      // 一共多少页
      total: 0,
      // 每页多少数据
      perPage: 50,
      tableHeight: window.innerHeight - 200 || 300,
      grantItem: {}, // 要发放的内容
      // 表格数据
      tableData: [
        {
          'group_number': '12344',
          'group_link': 'https://www.lingp.com',
          'founder': '季小蹭',
          'creation_time': '2019-11-03 9:00',
          'recharge_point': 250,
          'surplus_point': 50,
          'regiment_num': 5,
          'remaining_time': '6天21:10:20.8',
          'group_state': '拼团成功'
        },
        {
          'group_number': '43434',
          'group_link': 'https://www.lingp.com',
          'founder': '季小蹭',
          'creation_time': '2019-11-03 9:00',
          'recharge_point': 250,
          'surplus_point': 50,
          'regiment_num': 5,
          'remaining_time': '6天21:10:20.8',
          'group_state': '拼团成功'
        },
        {
          'group_number': '65656',
          'group_link': 'https://www.lingp.com',
          'founder': '季小蹭',
          'creation_time': '2019-11-03 9:00',
          'recharge_point': 250,
          'surplus_point': 50,
          'regiment_num': 5,
          'remaining_time': '6天21:10:20.8',
          'group_state': '拼团成功'
        }
      ],
      group_title: '',
      gridData: [
        {
          'group_name': '团员A',
          'recharge_points': 50,
          'recharge_time': '2019-11-03 9:00',
          'order_number': '2343242413542524353542'
        },
        {
          'group_name': '团员B',
          'recharge_points': 100,
          'recharge_time': '2019-11-03 9:00',
          'order_number': '2343242413542524353542'
        },
        {
          'group_name': '团员C',
          'recharge_points': 50,
          'recharge_time': '2019-11-03 9:00',
          'order_number': '2343242413542524353542'
        }
      ],
      dialogGroupInfo: false
    }
  },
  mounted() {
    this.getTableDate()
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
      this.loading = false
      // 请求的接口的位置
      // managerStudent(this.screenData).then(res => {
      //   this.loading = false
      //   this.total = res.data.count
      //   this.tableData = res.data.results
      // })
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
    // 发放奖励
    awardFun(item) {
      this.grantVisible = true
      this.grantItem = item
    },
    grantFun() {
      this.grantVisible = false
      this.$message({
        message: '发放成功',
        type: 'success'
      })
    },
    // 创建团
    foundsGroup() {
      this.$message({
        message: '创建成功',
        type: 'success'
      })
    },
    // 团详细信息
    groupInfo(group_id) {
      this.group_title = `团编号${group_id}`
      this.dialogGroupInfo = true
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
