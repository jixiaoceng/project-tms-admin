<template>
  <div>
    <screen-wrapper @search="search">
      <screen-item
        label="版本"
        :part="4"
        :label-width="labelWidth"
      >
        <el-select v-model="programme" placeholder="请选择">
          <el-option
            v-for="item in programmeOption"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </screen-item>
      <screen-item
        label="级别"
        :part="4"
        :label-width="labelWidth"
      >
        <el-select v-model="course_level" placeholder="请选择">
          <el-option
            v-for="item in level"
            :key="item.value"
            :label="item.lable"
            :value="item.value"
          />
        </el-select>
      </screen-item>
      <screen-item
        label="班型"
        :part="4"
        :label-width="labelWidth"
      >
        <el-select v-model="class_type" placeholder="请选择">
          <el-option
            v-for="item in classOption"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </screen-item>
      <screen-item label="老师姓名" :part="4" :label-width="labelWidth">
        <el-input v-model.trim="input" placeholder="请输入老师姓名" @keyup.enter.native="search" />
      </screen-item>
      <screen-item label="日期" :part="2" style="width:850px;" label-width="50">
        <el-radio-group v-model="dateDay" @change="changeRadion">
          <el-radio-button label="all">全部</el-radio-button>
          <el-radio-button
            v-for="(item,i) in Lastweek"
            :key="item.date"
            :label="item.date"
          >{{ item.date.slice(5) }}
            <span v-if="i==0">{{ '(今天)' }}</span>
            <span v-if="i==1">{{ '(明天)' }}</span>
            <span v-if="i!=0&&i!=1" tabindex="0">{{ '('+item.week+')' }}</span>
          </el-radio-button>
        </el-radio-group>
      </screen-item>
      <screen-item label="" :part="4">
        <el-date-picker
          v-model="date_day"
          type="date"
          placeholder="选择日期"
          @change="changeDate"
        />

      </screen-item>
      <screen-item label="时间" :part="1" label-width="50">
        <el-checkbox-group v-model="times">
          <el-checkbox
            v-for="(item,index) in date"
            :key="index"
            style="width:50px;"
            :value="item.lab"
            :label="item.val"
          />
        </el-checkbox-group>
      </screen-item>
    </screen-wrapper>
    <custom-card title="数据列表" class="table-wrapper" style="margin-top:20px;">

      <el-table
        ref="singleTable"
        v-loading="loading"
        tooltip-effect="dark"
        :default-sort="{prop: 'date', order: 'descending'}"
        :data="flag?findresultsArr:Screeningresults"
        :height="tableHeight"
        border
        highlight-current-row
        style="width: 100%;margin-top:20px;"
      >
        <el-table-column
          type="index"
          width="50"
          label="序号"
        />
        <el-table-column
          property="user.username"
          label="老师"
          width="120"
        />
        <el-table-column
          property="user.userdetail.real_name"
          label="真实姓名"
          width="120"
        />
        <el-table-column
          property="user.userdetail.gender"
          label="性别"
        />
        <el-table-column
          property="teach_year"
          label="教学年限"
        />
        <el-table-column
          property="rating"
          label="评分"
        />
        <el-table-column
          property="user.userdetail.phone_num"
          label="手机号"
        />
        <el-table-column
          property="country_of_residence"
          label="居住国"
        />
      </el-table>

      <custom-pagination
        :total="total"
        :current-page="currentPage"
        @getCurrentPage="getCurrentPage"
        @getPerPage="getPerPage"
      />
    </custom-card>
  </div>

</template>

<script>
import {
  searchTeacher
} from '@/api/tutorManagement/'
export default {
  data() {
    var day3 = new Date()
    day3.setTime(day3.getTime() + 24 * 60 * 60 * 1000)
    var s3 = day3.getFullYear() + '-' + (day3.getMonth() + 1) + '-' + day3.getDate()
    return {
      loading: true, // 加载loading
      page_size: '50', // 一页几条
      page: '1', // 当前第几页
      tableHeight: window.innerHeight - 200 || 300,
      // 当前页
      currentPage: 1,
      // 一共多少页
      total: 0,
      // 每页多少数据
      perPage: 50,
      flag: false, // 是否在结果中查找
      findresultsArr: [], // 在结果中查找
      dateDay: s3, // 点击点击周几
      Lastweek: [], // 实时更新当前一周信息
      labelWidth: '100',
      programme: '', // 版本
      course_level: '', // 级别
      class_type: '', // 班型
      date_day: '', // 日期  自己选择的
      times: ['7:00'], // 时间
      value1: '', // 选择日历的时间
      applyDate: [], // 日历
      Screeningresults: [], // 筛选结果
      currentRow: null,
      input: '',
      date: [
        { val: '0:00', lab: '00:00:00' },
        { val: '0:30', lab: '00:30:00' },
        { val: '1:00', lab: '01:00:00' },
        { val: '1:30', lab: '01:30:00' },
        { val: '2:00', lab: '02:00:00' },
        { val: '2:30', lab: '02:30:00' },
        { val: '3:00', lab: '03:00:00' },
        { val: '3:30', lab: '03:30:00' },
        { val: '4:00', lab: '04:00:00' },
        { val: '4:30', lab: '04:30:00' },
        { val: '5:00', lab: '05:00:00' },
        { val: '5:30', lab: '05:30:00' },
        { val: '6:00', lab: '06:00:00' },
        { val: '6:30', lab: '06:30:00' },
        { val: '7:00', lab: '07:00:00' },
        { val: '7:30', lab: '07:30:00' },
        { val: '8:00', lab: '08:00:00' },
        { val: '8:30', lab: '08:30:00' },
        { val: '9:00', lab: '09:00:00' },
        { val: '9:30', lab: '09:30:00' },
        { val: '10:00', lab: '10:00:00' },
        { val: '10:30', lab: '10:30:00' },
        { val: '11:00', lab: '11:00:00' },
        { val: '11:30', lab: '11:30:00' },
        { val: '12:00', lab: '12:00:00' },
        { val: '12:30', lab: '12:30:00' },
        { val: '13:00', lab: '13:00:00' },
        { val: '13:30', lab: '13:30:00' },
        { val: '14:00', lab: '14:00:00' },
        { val: '14:30', lab: '14:30:00' },
        { val: '15:00', lab: '15:00:00' },
        { val: '15:30', lab: '15:30:00' },
        { val: '16:00', lab: '16:00:00' },
        { val: '16:30', lab: '16:30:00' },
        { val: '17:00', lab: '17:00:00' },
        { val: '17:30', lab: '17:30:00' },
        { val: '18:00', lab: '18:00:00' },
        { val: '18:30', lab: '18:30:00' },
        { val: '19:00', lab: '19:00:00' },
        { val: '19:30', lab: '19:30:00' },
        { val: '20:00', lab: '20:00:00' },
        { val: '20:30', lab: '20:30:00' },
        { val: '21:00', lab: '21:00:00' },
        { val: '21:30', lab: '21:30:00' },
        { val: '22:00', lab: '22:00:00' },
        { val: '22:30', lab: '22:30:00' },
        { val: '23:00', lab: '23:00:00' }
      ],
      programmeOption: [{
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
        label: '双语版'
      }
      ],
      level: [
        { value: '', lable: '全部' },
        { value: '1', lable: 'Level1' },
        { value: '2', lable: 'Level2' },
        { value: '3', lable: 'Level3' },
        { value: '4', lable: 'Level4' },
        { value: '5', lable: 'Level5' },
        { value: '6', lable: 'Level6' }
      ],
      classOption: [
        {
          value: '',
          label: '全部'
        }, {
          value: 'oneonone',
          label: '一对一'
        }, {
          value: 'smallclass',
          label: '小班课'
        }]
    }
  },
  beforeCreate() {

  },
  created() {
    var day3 = new Date()
    day3.setTime(day3.getTime() + 24 * 60 * 60 * 1000)
    var s3 = day3.getFullYear() + '-' + (day3.getMonth() + 1) + '-' + day3.getDate()
    var information = {
      programme: '',
      course_level: '',
      class_type: '',
      date_day: s3,
      times: '07:00:00'
    }
    this.loading = true
    searchTeacher(information).then(res => {
      this.loading = false
      this.Screeningresults = res.data.results
      this.total = res.data.results.length
    })
  },
  mounted() {
    this.getWeek()
  },

  beforeDestroy() {

  },
  methods: {
    handleSelectionChange(val) {
      this.adviserSubmit.student_ids = val.map(item => (item.id))
    },
    // 获取当前页码
    getCurrentPage(currentPage) {
      this.page = currentPage
      this.currentPage = currentPage
      this.searchFn()
    },
    // 改变每页展示数据的条数
    getPerPage(perPage) {
      this.page_size = perPage
      this.perPage = perPage
      this.page = 1
      this.searchFn()
    },
    search() {
      this.currentPage = 1
      this.page = 1
      this.searchFn()
    },
    searchFn() { // 点击筛选
      this.loading = true
      this.flag = false
      var newTimes = []
      this.times.forEach(item => {
        if (item.split(':')[0].length === 1) {
          newTimes.push('0' + item + ':00')
        } else {
          newTimes.push(item + ':00')
        }
      })
      var information = {
        programme: this.programme,
        course_level: this.course_level,
        class_type: this.class_type,
        times: newTimes.toString(),
        date_day: this.date_day ? this.timeChange(this.date_day) : this.dateDay,
        page: this.page,
        page_size: this.page_size,
        teacher_name: this.input
      }
      console.log(information)
      searchTeacher(information).then(res => {
        this.loading = false
        this.Screeningresults = res.data.results
        this.total = res.data.count
      })
    },
    // 结果中查找
    findresults() {
      this.flag = true
      this.findresultsArr = []
      this.Screeningresults.forEach(item => {
        if (item.user.username === this.input) {
          this.findresultsArr.push(item)
        }
      })
    },
    // 日期切换
    changeRadion(val) {
      this.date_day = val ? '' : this.date_day
      this.applyDate = []
      this.tableType = val
      this.type = 1
    },
    changeDate() {
      this.dateDay = ''
    },
    getWeek() {
      var over = this.fun_date(7) // 七天后日期
      var start1 = new Date() // 当前时间
      var start = this.timeChange(start1).slice(this.timeChange(start1).length - 2)
      var end = over.slice(over.length - 2)
      var weekArray = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
      for (var i = start; i < end; i++) {
        var obj = {}
        obj.date = over.slice(0, -2) + i
        obj.week = weekArray[new Date(over.slice(0, -2) + i).getDay()]
        this.Lastweek.push(obj)
      }
    },
    fun_date(aa) { // 得到后七天的日期
      var date1 = new Date()
      // var time1 = date1.getFullYear() + '-' + (date1.getMonth() + 1) + '-' + date1.getDate()// time1表示当前时间
      var date2 = new Date(date1)
      date2.setDate(date1.getDate() + aa)
      var time2 = date2.getFullYear() + '-' + (date2.getMonth() + 1) + '-' + date2.getDate()
      return time2
    },
    getMyDay(date) { // 得到星期几
      var week
      if (date.getDay() === 0) week = '周日'
      if (date.getDay() === 1) week = '周一'
      if (date.getDay() === 2) week = '周二'
      if (date.getDay() === 3) week = '周三'
      if (date.getDay() === 4) week = '周四'
      if (date.getDay() === 5) week = '周五'
      if (date.getDay() === 6) week = '周六'
      return week
    },
    timeChange(time) {
      var d = new Date(time)
      var datetime = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate()
      return datetime
    }
  }

}
</script>
