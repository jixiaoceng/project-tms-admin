<template>
  <div class="scheduling-wrap">
    <screen-wrapper @search="search">
      <screen-item label="日期" :part="1" :label-width="labelWidth">
        <el-radio-group v-model="screenData.search_day" @change="changeRadion">
          <el-radio-button label="1">今天</el-radio-button>
          <el-radio-button label="2">明天</el-radio-button>
          <el-radio-button label="3">后天</el-radio-button>
          <el-radio-button label="7">未来七天</el-radio-button>
        </el-radio-group>
        <el-date-picker
          v-model="applyDate"
          style="margin-left:10px;"
          type="daterange"
          value-format="yyyy-MM-dd"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="pickerOptions"
          size="small"
          @change="timeChange"
        />
      </screen-item>
      <screen-item label="班型" :part="4" :label-width="labelWidth">
        <el-select v-model="screenData.class_type" placeholder="请选择">
          <el-option
            v-for="item in classOption"
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
      <screen-item label="课堂类型" :part="4" :label-width="labelWidth">
        <el-select v-model="screenData.student" placeholder="请选择">
          <el-option
            v-for="item in courseOption"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </screen-item>
      <screen-item label="学生用户名" :part="4" :label-width="labelWidth">
        <el-input v-model="screenData.student_name" placeholder="请输入学生用户名" @keyup.enter.native="search" />
      </screen-item>
    </screen-wrapper>
    <!-- 分类 -->
    <el-button-group v-if="tableType == 1" class="type-btn">
      <el-button
        size="medium"
        :type="type == 1 ? 'primary' : ''"
        @click="changeType(1)"
      >全部</el-button>
      <el-button
        size="medium"
        :type="type == 2 ? 'primary' : ''"
        @click="changeType(2)"
      >未开始</el-button>
      <el-button
        size="medium"
        :type="type == 3 ? 'primary' : ''"
        @click="changeType(3)"
      >正在上课</el-button>
      <el-button
        size="medium"
        :type="type == 4 ? 'primary' : ''"
        @click="changeType(4)"
      >已结束</el-button>
    </el-button-group>
    <!-- 表格 -->
    <custom-card title="数据列表" class="table-wrapper">
      <el-table
        v-loading="loading"
        :data="tableData"
        tooltip-effect="dark"
        :border="true"
        fit
        show-overflow-tooltip="true"
        style="width: 100%"
        :default-sort="{prop: 'date', order: 'descending'}"
        @sort-change="sortChange"
      >
        <el-table-column align="center" label="序号" :width="50">
          <template slot-scope="scope">{{ (currentPage - 1) * perPage + scope.$index + 1 }}</template>
        </el-table-column>
        <el-table-column
          :key="Math.random()"
          align="center"
          prop="scheduled_time"
          label="上课时间(北京)"
          sortable="custom"
          :width="160"
          :class-name="getSortClass('scheduled_time')"
        />
        <el-table-column :key="Math.random()" align="center" prop="class_type.type_name" label="班型" :width="tablWidth" />
        <el-table-column :key="Math.random()" align="center" label="学生用户名" :width="tablWidth">
          <template slot-scope="scope">
            <el-button v-for="item in scope.row.learning_group.students" :key="item.id" type="text">
              <router-link :to="{ path : `/studentManagement/studentInfo`, query:{ studentId:item.id }}">
                {{ item.username }}
              </router-link>
            </el-button>
          </template>
        </el-table-column>
        <!-- <el-table-column v-if="type != 4" :key="Math.random()" align="center" label="学生居住国" :width="tablWidth">
          <template slot-scope="scope">
            <span v-for="item in scope.row.learning_group.students" :key="item.id">{{ item.nationality }}</span>
          </template>
        </el-table-column> -->
        <!-- <el-table-column v-if="type !== 4" :key="Math.random()" align="center" prop="scheduled_time" label="上课时间(学生)" :width="tablWidth" /> -->
        <el-table-column :key="Math.random()" align="center" label="版本" :width="tablWidth">
          <template slot-scope="scope">
            <span v-if="scope.row.virtualclass.course_session">
              {{ scope.row.virtualclass.course_session.programme_name == 'Advanced' ? '高级版' : '国际版' }}
            </span>
            <span v-else>
              {{ scope.row.course_info.programme_name == 'Advanced' ? '高级版' : scope.row.course_info.programme_name == 'International Lite' ? '国际版' : 'SG' }}
            </span>
          </template>
        </el-table-column>
        <el-table-column :key="Math.random()" align="center" label="级别" :width="tablWidth">
          <template slot-scope="scope">
            <span v-if="scope.row.virtualclass.course_session">
              Level{{ scope.row.virtualclass.course_session.course_level }}
            </span>
            <span v-else>
              Level{{ scope.row.course_info.course_level }}
            </span>
          </template>
        </el-table-column>
        <el-table-column :key="Math.random()" align="center" label="上课进度" :width="tablWidth">
          <template slot-scope="scope">
            <span v-if="scope.row.virtualclass.course_session">
              {{ scope.row.virtualclass.course_session.session_name }}
            </span>
            <span v-else>
              lesson{{ scope.row.course_info.session_no }}
            </span>
          </template>
        </el-table-column>
        <el-table-column v-if="type != 4" :key="Math.random()" align="center" label="课堂类型" :width="tablWidth">
          <template slot-scope="scope">
            <span v-for="item in scope.row.learning_group.students" :key="item.id">{{ item.lesson_sum > 0 ? '正式课' : '试听课' }} </span>
          </template>
        </el-table-column>
        <el-table-column :key="Math.random()" align="center" label="老师" :width="tablWidth">
          <template slot-scope="scope">
            <span v-for="item in scope.row.hosts" :key="item.id">{{ item.username }}</span>
          </template>
        </el-table-column>
        <el-table-column v-if="type != 4" :key="Math.random()" align="center" label="是否新老师" :width="tablWidth">
          <template slot-scope="scope">
            <span
              v-for="item in scope.row.hosts"
              :key="item.id"
              :class="item.lession_num > 0 ? '': 'red'"
            >
              {{ item.lession_num > 0 ? '否' : '是' }}
            </span>
          </template>
        </el-table-column>
        <el-table-column v-if="type != 4" :key="Math.random()" align="center" prop="learning_group.last_teacher[0]" label="上节课老师" :width="tablWidth" />
        <el-table-column v-if="type != 4" :key="Math.random()" align="center" label="课堂模式" :width="tablWidth">
          <template slot-scope="scope">
            <span>{{ scope.row.virtualclass_type == 'Tk' ? '拓课' : '声网' }} </span>
          </template>
        </el-table-column>
        <el-table-column v-if="type === 3 || type === 4" :key="Math.random()" align="center" label="学生进课堂时间" :width="tablWidth">
          <template slot-scope="scope">
            <p v-if="scope.row.student_classroom">
              <span v-for="item in scope.row.student_classroom" :key="item.student_id">
                {{ item.in_class_time }} <br>
              </span>
            </p>
            <span v-else>---</span>
          </template>
        </el-table-column>
        <el-table-column v-if="type === 3 || type === 4" :key="Math.random()" align="center" prop="teacher_start_time" label="老师进课堂时间" :width="tablWidth" />
        <el-table-column v-if="type === 4" :key="Math.random()" align="center" label="学生出课堂时间" :width="tablWidth">
          <template slot-scope="scope">
            <p v-if="scope.row.student_classroom">
              <span v-for="item in scope.row.student_classroom" :key="item.student_id">
                {{ item.out_class_time }} <br>
              </span>
            </p>
            <span v-else>---</span>
          </template>
        </el-table-column>
        <el-table-column v-if="type === 4" :key="Math.random()" align="center" prop="teacher_end_time" label="老师出课堂时间" :width="tablWidth" />
        <el-table-column v-if="type == 4" :key="Math.random()" align="center" label="完课状态">
          <template slot-scope="scope">
            <span :class="scope.row.finish_status === '异常' ? 'red': ''">
              {{ scope.row.finish_status }}
            </span>
          </template>
        </el-table-column>
        <el-table-column :key="Math.random()" align="center" prop="" label="操作" fixed="right" :width="type==4 || type==1?'240':tablWidth">
          <template slot-scope="scope">
            <el-button
              v-if="scope.row.appointment_status == 'started'"
              type="text"
              @click="clickHandlerMonitor(scope.row.virtualclass.id)"
            >旁听</el-button>
            <el-button
              v-if="scope.row.appointment_status == 'started' || scope.row.appointment_status == 'start'"
              type="text"
              @click="clickHandlerRevert(scope.row.virtualclass.id)"
            >课堂转换</el-button>
            <el-button
              v-if="scope.row.appointment_status == 'finish'"
              type="text"
              @click="clickHandlerComment(scope.row.virtualclass.id,'Student',scope.row)"
            >老师评语</el-button>
            <el-button
              v-if="scope.row.appointment_status == 'finish'"
              type="text"
              @click="clickHandlerComment(scope.row.virtualclass.id,'Tutor',scope.row)"
            >学生反馈</el-button>
            <el-button
              v-if="scope.row.appointment_status == 'finish' && scope.row.virtualclass_type == 'Tk'"
              type="text"
              @click="clickHandlerPlayback(scope.row.virtualclass.id)"
            >课堂回放</el-button>
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
    <!-- 老师评语 -->
    <el-dialog :title="titleName" :visible.sync="teacherComments">
      <div class="teacher-tit">
        <el-row>
          <el-col :span="12">
            <label>老师：{{ teacherInfo.teacherName }}</label>
          </el-col>
          <el-col :span="12">
            <label>上课时间：{{ teacherInfo.classTime }}</label>
          </el-col>
          <el-col :span="12">
            <label>班型：{{ teacherInfo.classType }}</label>
          </el-col>
          <el-col :span="12">
            <label>本节课程：{{ teacherInfo.course }}</label>
          </el-col>
        </el-row>
      </div>
      <el-tabs v-if="JSON.stringify(valuationrate.valuation) !== '{}'" type="border-card">
        <el-tab-pane v-for="(item,index) in studentAll" :key="index">
          <span slot="label">{{ item.username }}</span>
          <div v-if="studentFeedback">
            <div v-if="valuationrate.valuation[item.username]" class="rate-tit">
              <span class="demonstration">知识掌握程度：</span>
              <el-rate v-model="valuationrate.valuation[item.username].PQ" disabled score-template="知识掌握程度：" />
            </div>
            <div v-if="valuationrate.valuation[item.username]" class="rate-tit">
              <span class="demonstration">进步程度：</span>
              <el-rate v-model="valuationrate.valuation[item.username].SP" disabled score-template="知识掌握程度：" />
            </div>
            <div v-if="valuationrate.valuation[item.username]" class="rate-tit">
              <span class="demonstration">学习态度：</span>
              <el-rate v-model="valuationrate.valuation[item.username].AR" disabled score-template="知识掌握程度：" />
            </div>
          </div>
          <div v-else>
            <div v-if="valuationrate.valuation[item.username]" class="rate-tit">
              <span class="demonstration">专业知识：</span>
              <el-rate v-model="valuationrate.valuation[item.username].PK" disabled score-template="知识掌握程度：" />
            </div>
            <div v-if="valuationrate.valuation[item.username]" class="rate-tit">
              <span class="demonstration">教授方式：</span>
              <el-rate v-model="valuationrate.valuation[item.username].ID" disabled score-template="知识掌握程度：" />
            </div>
            <div v-if="valuationrate.valuation[item.username]" class="rate-tit">
              <span class="demonstration">积极营造学习环境：</span>
              <el-rate v-model="valuationrate.valuation[item.username].LE" disabled score-template="知识掌握程度：" />
            </div>
          </div>
          <p v-if="valuationrate.comment[item.username]" v-loading="commentsLoading" class="evaluate">
            {{ valuationrate.comment[item.username].comment }}
          </p>
          <p v-else class="no-comments">
            <img src="../../assets/icon-no-comments.png">
            没写评语。。。
          </p>
        </el-tab-pane>
      </el-tabs>
      <p v-else class="no-comments">
        <img src="../../assets/icon-no-comments.png">
        暂无评价
      </p>
    </el-dialog>
  </div>
</template>

<script>
import { managerScheduler, virtualclassRevert, virtualclassMonitor, virtualclassPlayback, virtualclassComment } from '@/api/classManagement/'
export default {
  data() {
    return {
      screenData: {
        search_day: '1', // 1,2,3,4
        start_time: '', // 时间段start_time  2019-07-24 12:00:00 end_time  2019-07-24 12:00:00
        end_time: '',
        class_type: '', // 班型  oneonone  smallclass
        student: '', // 课程类型 new 试听课 old正式课
        teacher: '', // 新老师 new，老老师old
        programme_name: '', // 版本 Advanced高级 国际International
        student_name: '', // 学生姓名
        page_size: '20',
        page: '1',
        appoint_status: '', // start未开始, started正在进行，finish结束
        ordering: 'scheduled_time' // 按上课时间排序
      },
      type: 1, // 1全部2未开始3正在上课4已结束
      labelWidth: '80',
      tablWidth: '120',
      applyDate: [],
      value1: 4,
      tableType: 1, // 切换
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now()
        }
      },
      classOption: [
        {
          value: '',
          label: '全部'
        },
        {
          value: 'oneonone',
          label: '一对一'
        },
        {
          value: 'smallclass',
          label: '小班课'
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
          value: 'new',
          label: '试听课'
        },
        {
          value: 'old',
          label: '正式课'
        }
      ],
      studentAll: [],
      // 当前页
      currentPage: 1,
      // 一共多少页
      total: 0,
      // 每页多少数据
      perPage: 20,
      titleName: '',
      // 表格数据
      tableData: [],
      teacherComments: false, // 老师评语
      studentFeedback: true, // 学生反馈
      loading: true, // 加载loading
      commentsLoading: true,
      teacherInfo: {
        teacherName: '',
        classTime: '',
        classType: '',
        course: ''
      },
      valuationrate: {
        comment: [], // 评价
        valuation: [] // 评分
      }
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
    sortChange(column) {
      if (column.prop === 'scheduled_time' && column.order === 'ascending') { // 升序
        this.screenData.ordering = 'scheduled_time'
      } else if (column.prop === 'scheduled_time' && column.order === 'descending') { // 降序
        this.screenData.ordering = '-scheduled_time'
      } else {
        return
      }
      this.getTableDate()
    },
    // 表格数据
    getTableDate() {
      this.loading = true
      managerScheduler(this.screenData).then(res => {
        this.loading = false
        this.total = res.data.count
        this.tableData = res.data.results
      })
    },
    // 日期切换
    changeRadion(val) {
      this.applyDate = []
      this.tableType = val
      this.type = 1
    },
    timeChange() {
      if (this.applyDate) {
        this.screenData.start_time = this.applyDate[0]
        this.screenData.end_time = this.applyDate[1]
        this.screenData.search_day = ''
        this.tableType = ''
      } else {
        this.screenData.start_time = null
        this.screenData.end_time = null
        this.screenData.search_day = 1
        this.type = 1
      }
    },
    // 改变类型
    changeType(type) {
      this.type = type
      this.screenData.appoint_status = type === 1 ? '' : type === 2 ? 'start' : type === 3 ? 'started' : 'finish'
      this.screenData.page = 1
      this.getTableDate()
    },
    // 课堂转换
    clickHandlerRevert(virtualclass_id) {
      virtualclassRevert(virtualclass_id).then(res => {
        this.$message({
          message: '课堂转换成功',
          type: 'success'
        })
        this.getTableDate()
      })
    },
    // 旁听
    clickHandlerMonitor(virtualclass_id) {
      virtualclassMonitor(virtualclass_id).then(res => {
        if (res.data.data.virtualclass_type === 'Tk') {
          window.open(res.data.data.entrytkpath, '_blank')
        } else {
          window.open(process.env.VUE_APP_BASE_API + '/man/virtualclass/monitor/?vc_id=' + virtualclass_id, '_blank')
        }
      })
    },
    // 课堂回放
    clickHandlerPlayback(virtualclass_id) {
      virtualclassPlayback(virtualclass_id).then(res => {
        if (res.data.data.mp4_url && res.data.data.mp4_url !== 'null') {
          window.open(res.data.data.mp4_url, '_blank')
        } else {
          this.$message({
            message: '课堂回放未找到。。。',
            type: 'warning'
          })
        }
      })
    },
    // 老师评语
    clickHandlerComment(virtualclass_id, target, obj) {
      this.studentAll = []
      this.teacherInfo.teacherName = obj.hosts[0].username
      this.teacherInfo.classTime = obj.scheduled_time
      this.teacherInfo.classType = obj.class_type.type_name
      this.studentFeedback = target === 'Student'
      this.titleName = target === 'Student' ? '老师评语' : '学生反馈'
      if (obj.course_info) {
        this.teacherInfo.course = obj.course_info.programme_name === 'Advanced' ? '高级版 Level ' + obj.course_info.course_level + ' - lesson' + obj.course_info.session_no : '国际版 Level ' + obj.course_info.course_level + ' - lesson' + obj.course_info.session_no
      } else {
        this.teacherInfo.course = obj.virtualclass.course_session.programme_name === 'Advanced' ? '高级版 ' + obj.virtualclass.course_session.course_name + ' - ' + obj.virtualclass.course_session.session_name : '国际版 ' + obj.virtualclass.course_session.course_name + ' - ' + obj.virtualclass.course_session.session_name
      }
      this.teacherComments = true
      this.commentsLoading = true
      this.studentAll = obj.learning_group.students
      virtualclassComment(virtualclass_id, target).then(res => {
        this.commentsLoading = false
        this.valuationrate = res.data.data
      })
    },
    clickHandler() {},
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
.scheduling-wrap {
  .type-btn {
    padding: 20px 0 0 0;
  }
  .table-wrapper{
    margin-top:20px;
  }
  .teacher-tit{
    padding:10px;
    border:1px solid #ccc;
    border-radius:5px;
    margin-bottom:20px;
    .el-col{
      line-height:30px;
    }
  }
  .rate-tit{
    display:flex;
    .demonstration{
      line-height:20px;
      width:140px;
      font-size: 14px;
    }
  }
  .evaluate{
    height:100px;
    padding:10px;
    border:1px solid #ccc;
    border-radius:5px;
  }
  label{
    font-weight: 400;
  }
  .no-comments{
    img{
      width:60px;
      height:60px;
      display:block;
      margin:10px auto;
    }
    padding:30px 0 100px 0;
    text-align:center;
    height:30px;
  }
  .red{
    color:#f00;
  }
}
</style>

