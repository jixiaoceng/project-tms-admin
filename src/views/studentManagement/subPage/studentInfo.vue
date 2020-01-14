<template>
  <div class="vehicle-details two-line-form">
    <!-- 基本信息 -->
    <custom-card title="注册信息" class="box-card" :collapse="collapse">
      <el-row>
        <screen-item label="家长用户名">
          <el-input v-model="studentData.parent_user.username" :disabled="true" />
        </screen-item>
        <screen-item label="注册邮箱">
          <el-input v-model="studentData.parent_user.email" :disabled="true" />
        </screen-item>
        <screen-item label="姓名">
          <el-input :value="studentData.real_name" :disabled="true" />
        </screen-item>
        <screen-item label="性别">
          <el-input v-model="studentData.gender" :disabled="true" />
        </screen-item>
        <screen-item label="出生日期">
          <el-input v-model="studentData.birthday" :disabled="true" />
        </screen-item>
        <screen-item label="电话">
          <el-input v-model="studentData.parent_user.phone" :disabled="true" />
        </screen-item>
        <screen-item label="居住国">
          <el-input v-model="studentData.parent_user.country_of_residence" :disabled="true" />
        </screen-item>
        <screen-item label="货币种类">
          <el-input v-model="studentData.parent_user.currency" :disabled="true" />
        </screen-item>
        <screen-item label="注册日期">
          <el-input v-model="studentData.register_date" :disabled="true" />
        </screen-item>
        <screen-item label="推荐人">
          <el-input v-model="studentData.parent_user.referrer_user_name" :disabled="true" />
        </screen-item>
        <screen-item label="最近登录">
          <el-input v-model="studentData.parent_user.last_login" :disabled="true" />
        </screen-item>
      </el-row>
    </custom-card>
    <!-- 扩展信息 -->
    <custom-card title="扩展信息" class="box-card" :collapse="collapse">
      <div slot="header-right">
        <i v-if="exstudentDisabled" class="iconfont ppIcon-approval" @click="editExstudent" />
      </div>
      <el-row>
        <screen-item label="学生姓名">
          <el-input v-model="extstudent.student_name" :disabled="exstudentDisabled" />
        </screen-item>
        <screen-item label="性别">
          <el-select v-model="extstudent.gender" placeholder="" :disabled="exstudentDisabled">
            <el-option
              v-for="item in genderOption"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </screen-item>
        <screen-item label="年龄">
          <el-input v-model="extstudent.age" placeholder="请输入数字" :disabled="exstudentDisabled" />
        </screen-item>
        <screen-item label="联系电话">
          <el-input v-model="extstudent.phone" :disabled="exstudentDisabled" />
        </screen-item>
        <screen-item label="微信号">
          <el-input v-model="extstudent.weixin" :disabled="exstudentDisabled" />
        </screen-item>
        <screen-item label="WhatsApp">
          <el-input v-model="extstudent.whatsapp" :disabled="exstudentDisabled" />
        </screen-item>
        <screen-item label="就读年级">
          <el-input v-model="extstudent.class_year" :disabled="exstudentDisabled" />
        </screen-item>
        <screen-item label="就读学校">
          <el-input v-model="extstudent.school" :disabled="exstudentDisabled" />
        </screen-item>
        <screen-item label="学校性质">
          <el-input v-model="extstudent.school_nature" :disabled="exstudentDisabled" />
        </screen-item>
        <screen-item label="来源渠道">
          <el-input v-model="extstudent.source_channel" :disabled="exstudentDisabled" />
        </screen-item>
        <screen-item label="推荐人">
          <el-input v-model="extstudent.reference_name" :disabled="exstudentDisabled" />
        </screen-item>
        <screen-item label="授课老师">
          <el-input v-model="extstudent.teacher" :disabled="exstudentDisabled" />
        </screen-item>
        <screen-item label="授课时间">
          <el-input v-model="extstudent.teach_time" :disabled="exstudentDisabled" />
        </screen-item>
        <screen-item label="上课固定时间">
          <el-input v-model="extstudent.study_time" :disabled="exstudentDisabled" />
        </screen-item>
        <screen-item label="性格">
          <el-input v-model="extstudent.nature" :disabled="exstudentDisabled" />
        </screen-item>
        <screen-item label="兴趣爱好">
          <el-input v-model="extstudent.hobby" :disabled="exstudentDisabled" />
        </screen-item>
        <screen-item label="喜欢的学科">
          <el-input v-model="extstudent.favorite_subject" :disabled="exstudentDisabled" />
        </screen-item>
        <screen-item label="学习中文目的">
          <el-input v-model="extstudent.study_target" :disabled="exstudentDisabled" />
        </screen-item>
        <screen-item label="家长期望">
          <el-input v-model="extstudent.parental_expectation" :disabled="exstudentDisabled" />
        </screen-item>
        <screen-item label="课程顾问">
          <el-input v-model="studentData.course_adviser" :disabled="true" />
        </screen-item>
        <screen-item label="学管老师">
          <el-input v-model="studentData.learn_manager" :disabled="true" />
        </screen-item>
        <screen-item label="上课设备">
          <el-input v-model="extstudent.equipment" :disabled="exstudentDisabled" />
        </screen-item>
        <screen-item label="检测结果">
          <el-input v-model="extstudent.test_result" :disabled="exstudentDisabled" />
        </screen-item>
        <screen-item label="检测时间">
          <el-input v-model="extstudent.test_time" placeholder="2019-01-01 00:00:00" :disabled="exstudentDisabled" />
        </screen-item>
        <screen-item label="付费意向">
          <el-select v-model="extstudent.pay_action" placeholder="" :disabled="exstudentDisabled">
            <el-option
              v-for="item in courseOption"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </screen-item>
        <screen-item label="是否可以自行约课">
          <el-select v-model="extstudent.can_appointment" placeholder="" :disabled="exstudentDisabled">
            <el-option
              v-for="item in selectOption"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </screen-item>
        <screen-item label="是否需要更换老师">
          <el-select v-model="extstudent.change_teacher" placeholder="" :disabled="exstudentDisabled">
            <el-option
              v-for="item in selectOption"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </screen-item>
        <screen-item label="日常是否有中文环境">
          <el-select v-model="extstudent.has_chinese_env" placeholder="" :disabled="exstudentDisabled">
            <el-option
              v-for="item in selectOption"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </screen-item>
        <screen-item label="学生所在地">
          <el-input v-model="extstudent.student_location" :disabled="exstudentDisabled" />
        </screen-item>
        <screen-item label="在平台学习的兄弟姐妹数量">
          <el-input v-model="extstudent.learning_brother" placeholder="请输入数字" :disabled="exstudentDisabled" />
        </screen-item>
        <screen-item style="width: 100%;" label="课程顾问沟通反馈">
          <el-input v-model="extstudent.feedback" type="textarea" maxlength=500 :disabled="exstudentDisabled" />
        </screen-item>
        <screen-item label="">
          <el-button v-if="!exstudentDisabled" type="primary" size="small" @click="addExstudent">保存</el-button>
        </screen-item>
      </el-row>
    </custom-card>
    <!-- 上课进度 -->
    <custom-card title="上课进度" class="box-card" :collapse="collapse">
      <el-row>
        <screen-item label="在学版本">
          <el-input v-model="courseInfo.course_edition_name" :disabled="true" />
        </screen-item>
        <screen-item label="在学级别">
          <el-input :value="courseInfo.course_level ? 'Level ' + courseInfo.course_level : ''" :disabled="true" />
        </screen-item>
        <screen-item label="家长问卷结果">
          <el-input v-if="courseInfo.parent_result && JSON.stringify(courseInfo.parent_result) !== '{}'" :value="courseInfo.parent_result.course_edition_name == 'Advanced' ? '高级版 ' + '- level ' + courseInfo.parent_result.level : courseInfo.parent_result.course_edition_name == 'International Lite' ? '国际版 ' + '- level ' + courseInfo.parent_result.level : '双语版 ' + '- level ' + courseInfo.parent_result.level" :disabled="true" />
          <el-input v-else value="没做家长问卷" :disabled="true" />
          <el-button type="text">查看家长问卷记录</el-button>
        </screen-item>
        <screen-item label="水平测试结果">
          <el-input v-if="courseInfo.assessment_result && JSON.stringify(courseInfo.assessment_result) !== '{}'" :value="courseInfo.assessment_result.course_edition_name == 'Advanced' ? '高级版 ' + '- level ' + courseInfo.assessment_result.test_level : courseInfo.assessment_result.course_edition_name == 'International Lite' ? '国际版 ' + '- level ' + courseInfo.assessment_result.test_level : '双语版 ' + '- level ' + courseInfo.assessment_result.test_level" :disabled="true" />
          <el-input v-else value="没做水平测试" :disabled="true" />
          <el-button type="text">查看水平测试记录</el-button>
        </screen-item>
        <screen-item label="上课进度">
          <el-input :value="courseInfo.lesson_no ? 'Lesson ' + courseInfo.lesson_no : ''" :disabled="true" />
        </screen-item>
        <screen-item label="账户余额">
          <el-input v-model="courseInfo.balance" :disabled="true" />
        </screen-item>
        <screen-item label="小班课余额">
          <el-input :value="courseInfo.smallclass_balance ? courseInfo.smallclass_balance.remaining_limit: ''" :disabled="true" />
        </screen-item>
        <!-- 小班课设置 -->
        <screen-item label="是否开启小班课" :part="2" label-width="120">
          <el-radio-group v-model="courseInfo.allow_smallclass" @change="changeAllowSmallclass">
            <el-radio-button label="1">是</el-radio-button>
            <el-radio-button label="0">否</el-radio-button>
          </el-radio-group>
        </screen-item>
        <!-- 固定小班课 -->
        <screen-item label="是否只上小班课" :part="2" label-width="120">
          <el-radio-group v-model="courseInfo.only_smallclass" @change="changeOnlySmallclass">
            <el-radio-button label="1">是</el-radio-button>
            <el-radio-button label="0">否</el-radio-button>
          </el-radio-group>
        </screen-item>
      </el-row>
    </custom-card>
    <!--备注-->
    <custom-card title="备注" class="table-wrapper" :collapse="collapse">
      <div slot="header-right"><i class="iconfont ppIcon-copy" @click="closingRemarkShow = true" /></div>
      <el-table
        :data="tableData"
        tooltip-effect="dark"
        :border="true"
        style="width: 100%"
      >
        <el-table-column align="center" label="序号" :width="50">
          <template slot-scope="scope">{{ (remarkstudent.page - 1) * remarkstudent.page_size + scope.$index + 1 }}</template>
        </el-table-column>
        <el-table-column align="center" prop="create_time" label="备注时间" :width="150" />
        <el-table-column align="center" prop="content" label="备注内容" />
        <el-table-column align="center" prop="user.username" label="备注人" :width="100" />
        <el-table-column align="center" label="备注人角色" :width="100">
          <template slot-scope="scope">
            <span v-for="item in scope.row.user.role" :key="item.code" style="display:block;">{{ item.name }}</span>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <custom-pagination
        :total="total"
        :current-page="remarkstudent.page"
        @getCurrentPage="getCurrentPage"
        @getPerPage="getPerPage"
      />
    </custom-card>
    <el-dialog title="添加备注" :visible.sync="closingRemarkShow">
      <el-form>
        <el-form-item>
          <el-input
            v-model="Remarkcontent"
            type="textarea"
            maxlength="200"
            :rows="4"
            placeholder="请填写备注内容"
          />
        </el-form-item>
        <el-form-item class="btn-wrapper text-center">
          <el-button @click="closingRemarkShow = false">取消</el-button>
          <el-button type="primary" @click="endRemarkConfirm">保存备注</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { managerStudentDetails, managerExtstudent, managerExtstudentAdd, managerStudentCourse, getRemarkstudent, postRemarkstudent, studentAllowSmallclass, studentOnlySmallclass } from '@/api/classManagement/'
export default {
  data() {
    return {
      collapse: true, // 展开收起
      studentData: {},
      extstudent: { // 扩展信息
        'id': '',
        'phone': '',
        'weixin': '', // 微信号
        'whatsapp': '',
        'class_year': '', // 就读年级
        'school': '', // 就读学校
        'school_nature': '', // 学校性质
        'source_channel': '',
        'course_adviser': '',
        'learn_manager': '',
        'equipment': '',
        'test_result': '',
        'test_time': '',
        'pay_action': '', // 1低，2中，3，高
        'student_name': '', // 新增的字段
        'reference_name': '',
        'gender': '',
        'teacher': '',
        'teach_time': '',
        'study_time': '',
        'nature': '',
        'hobby': '',
        'favorite_subject': '',
        'study_target': '',
        'parental_expectation': '',
        'learning_brother': '',
        'feedback': '',
        'student_residence': ''
      },
      courseInfo: { // 上课进度
        'programme_name': '',
        'course_level': '',
        'session_no': '',
        'balance': 0,
        'smallclass_balance': '',
        'allow_smallclass': '',
        'only_smallclass': ''
      },
      remarkstudent: {
        'page': 1,
        'page_size': 20,
        'student_id': ''
      },
      Remarkcontent: '', // 备注信息
      closingRemarkShow: false,
      studentId: '', // 学生id
      // 当前页
      total: 0,
      // 每页多少数据
      perPage: 20,
      courseOption: [
        {
          value: 1,
          label: '低'
        },
        {
          value: 2,
          label: '中'
        },
        {
          value: 3,
          label: '高'
        }
      ],
      selectOption: [
        {
          value: 1,
          label: '是'
        },
        {
          value: 2,
          label: '否'
        },
        {
          value: 3,
          label: '未选择'
        }
      ],
      genderOption: [
        {
          value: 1,
          label: '男'
        },
        {
          value: 2,
          label: '女'
        },
        {
          value: 3,
          label: '未选择'
        }
      ],
      exstudentDisabled: true, // 扩展信息编辑
      // 表格数据
      tableData: []
    }
  },
  created() {
    this.studentId = this.$route.query.studentId
    this.setPageTitle('学生档案')
    this.studentDetails()
  },
  methods: {
    // 注册信息
    studentDetails() {
      managerStudentDetails(this.studentId).then(res => {
        this.studentData = res.data
        this.getExtstudent()
      })
    },
    // 扩展信息
    getExtstudent() {
      managerExtstudent(this.studentId).then(res => {
        this.extstudent = res.data
        this.getCourseInfo()
      })
    },
    // 编辑扩展信息
    editExstudent() {
      this.exstudentDisabled = false
    },
    // 提交
    addExstudent() {
      const { whatsapp,
        weixin,
        update_time,
        test_time,
        test_result,
        student_location,
        source_channel,
        school_nature,
        school,
        phone,
        pay_action,
        id,
        equipment,
        create_time,
        class_year,
        age,
        student_name,
        reference_name,
        gender,
        teacher,
        teach_time,
        study_time,
        nature,
        hobby,
        favorite_subject,
        can_appointment,
        change_teacher,
        has_chinese_env,
        study_target,
        parental_expectation,
        learning_brother,
        feedback } = this.extstudent
      const params = {
        whatsapp,
        weixin,
        update_time,
        test_time,
        test_result,
        student_location,
        source_channel,
        school_nature,
        school,
        phone,
        pay_action: pay_action || 3,
        id,
        equipment,
        create_time,
        class_year,
        age,
        student_name,
        reference_name,
        gender: gender || 3,
        teacher,
        teach_time,
        study_time,
        nature,
        hobby,
        favorite_subject,
        can_appointment: can_appointment || 3,
        change_teacher: change_teacher || 3,
        has_chinese_env: has_chinese_env || 3,
        study_target,
        parental_expectation,
        learning_brother,
        feedback,
        student_id: this.studentId
      }
      this.exstudentDisabled = true
      managerExtstudentAdd(params).then(res => {
        this.$message({
          message: '添加成功',
          type: 'success'
        })
        this.getExtstudent()
      })
    },
    // 上课进度
    getCourseInfo() {
      managerStudentCourse(this.studentId).then(res => {
        if (res.data.code === 0) {
          this.courseInfo = res.data.data
          this.courseInfo.programme_name = this.courseInfo.course_edition_name === 'Advanced' ? '高级版' : this.courseInfo.course_edition_nmae === 'International Lite' ? '国际版' : 'SG'
        }
        this.getRemark()
      })
    },
    getRemark() {
      this.remarkstudent.student_id = this.studentId
      getRemarkstudent(this.remarkstudent).then(res => {
        this.total = res.data.count
        this.tableData = res.data.results
      })
    },
    // 添加备注
    endRemarkConfirm() {
      const params = {
        'content': this.Remarkcontent,
        'student_id': this.studentId
      }
      postRemarkstudent(params).then(res => {
        this.$message({
          message: '添加备注成功',
          type: 'success'
        })
        this.getRemark()
      })
      this.closingRemarkShow = false
    },
    ...mapMutations({
      setPageTitle: 'SET_PAGE_TITLE'
    }),
    // 获取当前页码
    getCurrentPage(currentPage) {
      this.remarkstudent.page = currentPage
      this.getRemark()
    },
    // 改变每页展示数据的条数
    getPerPage(perPage) {
      this.remarkstudent.page_size = perPage
      this.remarkstudent.page = 1
      this.getRemark()
    },
    // 是否允许上小班课
    changeAllowSmallclass() {
      studentAllowSmallclass(this.studentId, this.courseInfo.allow_smallclass).then(res => {
        this.$message({
          message: 'success',
          type: 'success'
        })
      })
    },
    // 是否允许上小班课
    changeOnlySmallclass() {
      studentOnlySmallclass(this.studentId, this.courseInfo.only_smallclass).then(res => {
        this.$message({
          message: 'success',
          type: 'success'
        })
      })
    }
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
  .iconfont{
    cursor: pointer;
    color:#5CC2D0;
  }
}
</style>
