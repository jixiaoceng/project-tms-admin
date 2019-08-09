<template>
  <div class="vehicle-details two-line-form">
    <!-- 基本信息 -->
    <custom-card title="注册信息" class="box-card" :collapse="collapse">
      <el-row>
        <screen-item label="用户名">
          <el-input v-model="studentData.username" :disabled="true" />
        </screen-item>
        <screen-item label="注册邮箱">
          <el-input v-model="studentData.email" :disabled="true" />
        </screen-item>
        <screen-item label="姓名">
          <el-input :value="studentData.first_name + studentData.last_name" :disabled="true" />
        </screen-item>
        <screen-item label="性别">
          <el-input v-model="studentData.email" :disabled="true" />
        </screen-item>
        <screen-item label="出生日期">
          <el-input v-model="studentData.birthdate" :disabled="true" />
        </screen-item>
        <screen-item label="电话">
          <el-input v-model="studentData.first_name" :disabled="true" />
        </screen-item>
        <screen-item label="居住国">
          <el-input v-model="studentData.nationality" :disabled="true" />
        </screen-item>
        <screen-item label="货币种类">
          <el-input v-model="studentData.currency" :disabled="true" />
        </screen-item>
        <screen-item label="注册日期">
          <el-input v-model="studentData.date_joined" :disabled="true" />
        </screen-item>
        <screen-item label="推荐人">
          <el-input v-model="studentData.first_name" :disabled="true" />
        </screen-item>
        <screen-item label="最近登录">
          <el-input v-model="studentData.last_login" :disabled="true" />
        </screen-item>
      </el-row>
    </custom-card>
    <!-- 扩展信息 -->
    <custom-card title="扩展信息" class="box-card" :collapse="collapse">
      <el-row>
        <screen-item label="联系电话">
          <el-input v-model="extstudent.phone" :disabled="true" />
        </screen-item>
        <screen-item label="微信号">
          <el-input v-model="extstudent.weixin" :disabled="true" />
        </screen-item>
        <screen-item label="WhatsApp">
          <el-input v-model="extstudent.whatsapp" :disabled="true" />
        </screen-item>
        <screen-item label="就读年级">
          <el-input v-model="extstudent.class_year" :disabled="true" />
        </screen-item>
        <screen-item label="就读学校">
          <el-input v-model="extstudent.school" :disabled="true" />
        </screen-item>
        <screen-item label="学校性质">
          <el-input v-model="extstudent.school_nature" :disabled="true" />
        </screen-item>
        <screen-item label="来源渠道">
          <el-input v-model="extstudent.source_channel" :disabled="true" />
        </screen-item>
        <screen-item label="课程顾问">
          <el-input v-model="extstudent.course_adviser" :disabled="true" />
        </screen-item>
        <screen-item label="学管老师">
          <el-input v-model="extstudent.learn_manager" :disabled="true" />
        </screen-item>
        <screen-item label="上课设备">
          <el-input v-model="extstudent.equipment" :disabled="true" />
        </screen-item>
        <screen-item label="检测结果">
          <el-input v-model="extstudent.test_result" :disabled="true" />
        </screen-item>
        <screen-item label="检测时间">
          <el-input v-model="extstudent.test_time" :disabled="true" />
        </screen-item>
        <screen-item label="付费意向">
          <el-input v-model="extstudent.pay_action" :disabled="true" />
        </screen-item>
        <screen-item label="学生所在地">
          <el-input v-model="extstudent.student_residence" :disabled="true" />
        </screen-item>
      </el-row>
    </custom-card>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  data() {
    return {
      collapse: true, // 展开收起
      studentData: { // 注册信息
        'id': 1557,
        'username': 'sc_teacher',
        'email': '563405366@qq.com',
        'date_joined': '2019-07-16T03:30:38Z',
        'last_login': '2019-07-30T08:50:01Z',
        'first_name': '',
        'last_name': '',
        'gender': null,
        'nationality': null,
        'currency': null,
        'birthdate': null
      },
      extstudent: { // 扩展信息
        'id': 1,
        'phone': '假字段',
        'weixin': '+65 12345678', // 微信号
        'whatsapp': '45',
        'class_year': '小二', // 就读年级
        'school': '就读学校', // 就读学校
        'school_nature': '政府学校', // 学校性质
        'source_channel': '悉尼微信公众号',
        'course_adviser': '王鹏天',
        'learn_manager': '黄红',
        'equipment': 'mac',
        'test_result': '正常',
        'test_time': '2019-08-08',
        'pay_action': 3, // 1低，2中，3，高
        'student_residence': '假字段后台没返回'
      }
    }
  },
  created() {
    this.setPageTitle('学生档案')
  },
  methods: {
    ...mapMutations({
      setPageTitle: 'SET_PAGE_TITLE'
    })
  }
}
</script>

<style lang="scss" scoped>
.vehicle-details {
  .certification-img {
    width: 300px;
    height: 150px;
  }
  .isAbnormal span {
    color: red;
    font-size: 12px;
  }
  .box-card{
    margin-bottom:20px;
  }
}
</style>
