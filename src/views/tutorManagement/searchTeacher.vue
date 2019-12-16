<!--
 * @Author: fangli.ji
 * @Date: 2019-10-30 18:37:47
 * @LastEditors: fangli.ji
 * @LastEditTime: 2019-11-11 16:49:30
 -->
<template>
  <div>
    <screen-wrapper @search="search">
      <screen-item
        label="版本"
        :part="4"
        :label-width="50"
      >
        <el-select v-model="course_edition" placeholder="请选择">
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
            :label="item.label"
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
<!--      <screen-item-->
<!--        label="状态"-->
<!--        :part="4"-->
<!--        :label-width="labelWidth"-->
<!--      >-->
<!--        <el-select v-model="tutor_status" placeholder="请选择">-->
<!--          <el-option-->
<!--            v-for="item in statusOption"-->
<!--            :key="item.value"-->
<!--            :label="item.label"-->
<!--            :value="item.value"-->
<!--          />-->
<!--        </el-select>-->
<!--      </screen-item>-->
      <screen-item label="老师姓名" :part="4" :label-width="labelWidth">
        <el-input v-model.trim="input" placeholder="请输入老师姓名" @keyup.enter.native="search" />
      </screen-item>
      <screen-item label="日期" :part="1" label-width="50">
        <el-radio-group v-model="dateDay" @change="changeRadion">
          <el-radio-button style="outlint:none" label="all" @click.native.prevent="clickitem('all')"> 全部</el-radio-button>
          <el-radio-button
            v-for="(item,i) in Lastweek"
            :key="item.date"
            :label="item.date"
            @click.native.prevent="clickitem(item.date)"
          >
            <span>{{ item.date.slice(5) }}</span>
            <span v-if="i==0">{{ '(今天)' }}</span>
            <span v-if="i==1">{{ '(明天)' }}</span>
            <span v-if="i!=0&&i!=1">{{ '('+item.week+')' }}</span>
          </el-radio-button>
        </el-radio-group>
        <el-date-picker
          v-model="date_day"
          style="margin-left:20px"
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
          align="center"
          width="50"
          label="序号"
        />
        <el-table-column
          property="username"
          label="老师"
          align="center"
          width="120"
        />
        <el-table-column
          property="real_name"
          label="真实姓名"
          align="center"
          width="120"
        />
        <el-table-column
          property="gender"
          label="性别"
          align="center"
        />
        <el-table-column
          property="teach_age"
          label="教学年限"
          align="center"
        />
        <el-table-column
          property="rating"
          label="评分"
          align="center"
        />
        <el-table-column
          property="phone"
          label="手机号"
          align="center"
        />
        <el-table-column
          property="country_of_residence"
          label="居住国"
          align="center"
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
    return {
      week: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
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
      dateDay: '', // 点击点击周几
      Lastweek: [], // 实时更新当前一周信息
      labelWidth: '100',
      course_edition: '', // 版本
      course_level: '', // 级别
      class_type: '', // 班型
      date_day: '', // 日期  自己选择的
      times: [], // 时间
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
      statusOption: [{
        value: '',
        label: '全部'
      },
      {
        value: 'hidden',
        label: '未激活(隐藏)'
      },
      {
        value: 'normal',
        label: '在岗'
      },
      {
        value: 'delete',
        label: '离岗'
      }
      ],
      level: [
        { value: '', label: '全部' },
        { value: '1', label: 'Level1' },
        { value: '2', label: 'Level2' },
        { value: '3', label: 'Level3' },
        { value: '4', label: 'Level4' },
        { value: '5', label: 'Level5' },
        { value: '6', label: 'Level6' }
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
    var information = {
      course_edition: '',
      course_level: '',
      class_type: '',
      date_day: '',
      times: ''
    }
    this.loading = true
    searchTeacher(information).then(res => {
      this.loading = false
      this.Screeningresults = res.data.results
      this.total = res.data.count
    })
  },
  mounted() {
    this.getWeek(6)
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
        course_edition: this.course_edition,
        course_level: this.course_level,
        class_type: this.class_type,
        times: newTimes.toString(),
        date_day: this.date_day ? this.timeChange(this.date_day) : this.dateDay,
        page: this.page,
        page_size: this.page_size,
        teacher_name: this.input
      }
      if (information.times !== '') { // 选择时间就必须选择日期
        if (information.date_day) {
          searchTeacher(information).then(res => {
            this.loading = false
            this.Screeningresults = res.data.results
            this.total = res.data.count
          })
        } else {
          alert('请选择日期！')
        }
      } else {
        searchTeacher(information).then(res => {
          this.loading = false
          this.Screeningresults = res.data.results
          this.total = res.data.count
        })
      }
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
    clickitem(e) {
      e === this.dateDay ? this.dateDay = '' : this.dateDay = e
    },
    changeDate() {
      this.dateDay = ''
    },
    getWeek(num) {
      const date = new Date()
      var isCurrentDay = date.getDate()
      const isCurrentMonth = date.getMonth()
      const isCurrentYear = date.getFullYear()
      const calendatArr = []
      for (var i = 0; i < num + 1; i++) {
        var newDate = new Date(isCurrentYear, isCurrentMonth, (isCurrentDay + i))
        let days = newDate.getDate() < 9 ? '0' + newDate.getDate() : newDate.getDate()
        const month = (newDate.getMonth() + 1) < 9 ? '0' + (newDate.getMonth() + 1) : (newDate.getMonth() + 1)
        days = newDate.getFullYear() + '-' + month + '-' + days
        calendatArr.push({
          'date': days,
          'week': this.week[newDate.getDay()]
        })
      }
      this.Lastweek = calendatArr
    },
    timeChange(time) {
      var d = new Date(time)
      var datetime = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate()
      return datetime
    }
  }

}
</script>
