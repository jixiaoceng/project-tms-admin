<template>
  <div class="student-wrap">
    <screen-wrapper @search="search">
      <screen-item label="日期" :part="1" :label-width="labelWidth">
        <el-radio-group v-model="screenData.search_day">
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
        <el-input v-model="screenData.student_name" placeholder="请输入学生用户名" />
      </screen-item>
    </screen-wrapper>
    <!-- 分类 -->
    <el-button-group class="type-btn">
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
        :data="tableData"
        tooltip-effect="dark"
        :border="true"
        style="width: 100%"
      >
        <el-table-column align="center" label="序号" :width="50">
          <template slot-scope="scope">{{ (currentPage - 1) * perPage + scope.$index + 1 }}</template>
        </el-table-column>
        <el-table-column align="center" prop="scheduled_time" label="上课时间(北京)" />
        <el-table-column align="center" prop="class_type.type_name" label="班型" />
        <el-table-column align="center" label="学生用户名">
          <template slot-scope="scope">
            <!-- <router-link> -->
            <el-button v-for="item in scope.row.learning_group.students" :key="item.id" type="text">{{ item.username }}</el-button>
            <!-- </router-link> -->
          </template>
        </el-table-column>
        <el-table-column v-if="type != 4" align="center" label="学生居住国">
          <template slot-scope="scope">
            <span v-for="item in scope.row.learning_group.students" :key="item.id">{{ item.nationality }}</span>
          </template>
        </el-table-column>
        <el-table-column v-if="type != 4" align="center" prop="" label="上课时间(学生)" />
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
        <el-table-column align="center" label="上课进度">
          <template slot-scope="scope">
            Lesson{{ scope.row.course_info.course_level }}
          </template>
        </el-table-column>
        <el-table-column v-if="type != 4" align="center" label="课堂类型">
          <template slot-scope="scope">
            <span v-for="item in scope.row.learning_group.students" :key="item.id">{{ item.lesson_sum > 0 ? '正式课' : '试听课' }}</span>
          </template>
        </el-table-column>
        <el-table-column v-if="type != 4" align="center" label="老师">
          <template slot-scope="scope">
            <span v-for="item in scope.row.hosts" :key="item.id">{{ item.username }}</span>
          </template>
        </el-table-column>>
        <el-table-column v-if="type != 4" align="center" label="是否新老师">
          <template slot-scope="scope">
            <span v-for="item in scope.row.hosts" :key="item.id">{{ item.lession_num > 0 ? '否' : '是' }}</span>
          </template>
        </el-table-column>
        <el-table-column v-if="type != 4" align="center" prop="learning_group.last_teacher[0]" label="上节课老师" />
        <el-table-column v-if="type != 4" align="center" prop="virtualclass_type" label="课堂模式" />
        <el-table-column v-if="type == 3 || type == 4" align="center" label="学生进课堂时间" />
        <el-table-column v-if="type == 3 || type == 4" align="center" label="老师进课堂时间" />
        <el-table-column v-if="type == 4" align="center" prop="" label="完课状态" />
        <el-table-column align="center" prop="" label="操作" fixed="right">
          <template slot-scope="scope">
            <el-button
              v-if="type == 3"
              type="text"
              @click="clickHandler(scope.row)"
            >旁听</el-button>
            <el-button
              v-if="type != 4"
              type="text"
              @click="clickHandler(scope.row)"
            >课堂转换</el-button>
            <el-button
              v-if="type == 4"
              type="text"
              @click="clickHandler(scope.row)"
            >老师评语</el-button>
            <el-button
              v-if="type == 4"
              type="text"
              @click="clickHandler(scope.row)"
            >学生反馈</el-button>
            <el-button
              v-if="type == 4"
              type="text"
              @click="clickHandler(scope.row)"
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      screenData: {
        search_day: '', // 1,2,3,4
        start_time: '', // 时间段start_time  2019-07-24 12:00:00 end_time  2019-07-24 12:00:00
        end_time: '',
        class_type: '', // 班型  oneonone  smallclass
        student: '', // 课程类型 new 试听课 old正式课
        teacher: '', // 新老师 new，老老师old
        programme_name: '', // 版本 Advanced高级 国际International
        student_name: '', // 学生姓名
        ordering: '' // 按上课时间排序
      },
      type: 1, // 1全部2未开始3正在上课4已结束
      labelWidth: '80',
      tablWidth: '120',
      applyDate: [],
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
      // 当前页
      currentPage: 1,
      // 一共多少页
      total: 0,
      // 每页多少数据
      perPage: 10,
      // 表格数据
      tableData: [
        {
          'scheduled_time': '2019-07-24 12:20',
          'hosts': [{
            'id': 1137,
            'username': 'Fiona.Fang',
            'lession_num': 96
          }],
          'class_type': {
            'type': 'oneonone',
            'type_name': '一对一'
          },
          'learning_group': {
            'last_teacher': [
              'Fiona.Fang'
            ],
            'students': [{
              'id': 393,
              'username': 'wu70343',
              'lesson_sum': 94.0,
              'first_name': '律',
              'last_name': '吴',
              'nationality': null
            }]
          },
          'tk_class_id': '1670840692',
          'course_info': {
            'course_name': 'NN L3',
            'course_level': 3,
            'programme_name': 'Advanced'
          },
          'appointment_status': 'started',
          'virtualclass_type': '拓客'
        },
        {
          'scheduled_time': '2019-07-24 12:50',
          'hosts': [{
            'id': 359,
            'username': '陈晰子',
            'lession_num': 417
          }],
          'class_type': {
            'type': 'oneonone',
            'type_name': '一对一'
          },
          'learning_group': {
            'last_teacher': [
              '陈晰子'
            ],
            'students': [{
              'id': 728,
              'username': 'melody57',
              'lesson_sum': 59.0,
              'first_name': null,
              'last_name': null,
              'nationality': null
            }]
          },
          'tk_class_id': '1064329856',
          'course_info': {
            'course_name': 'NN L2',
            'course_level': 2,
            'programme_name': 'Advanced'
          },
          'appointment_status': 'start',
          'virtualclass_type': '拓客'
        },
        {
          'scheduled_time': '2019-07-24 7:30',
          'hosts': [{
            'id': 357,
            'username': '孙睿',
            'lession_num': 43
          }],
          'class_type': {
            'type': 'oneonone',
            'type_name': '一对一'
          },
          'learning_group': {
            'last_teacher': [
              '孙睿'
            ],
            'students': [{
              'id': 815,
              'username': 'Harry',
              'lesson_sum': 41.0,
              'first_name': null,
              'last_name': null,
              'nationality': null
            }]
          },
          'tk_class_id': '1464727338',
          'course_info': {
            'course_name': 'NN L2',
            'course_level': 2,
            'programme_name': 'Advanced'
          },
          'appointment_status': 'started',
          'virtualclass_type': '拓客'
        },
        {
          'scheduled_time': '2019-07-24 06:00',
          'hosts': [{
            'id': 1332,
            'username': 'Talia.Yang',
            'lession_num': 13
          }],
          'class_type': {
            'type': 'oneonone',
            'type_name': '一对一'
          },
          'learning_group': {
            'last_teacher': [
              'Talia.Yang'
            ],
            'students': [{
              'id': 1369,
              'username': '安如',
              'lesson_sum': 6.0,
              'first_name': null,
              'last_name': null,
              'nationality': null
            }]
          },
          'tk_class_id': '2027364210',
          'course_info': {
            'course_name': 'NN L1',
            'course_level': 1,
            'programme_name': 'Advanced'
          },
          'appointment_status': 'started',
          'virtualclass_type': '拓客'
        },
        {
          'scheduled_time': '2019-07-24 01:00',
          'hosts': [{
            'id': 122,
            'username': 'yumeng',
            'lession_num': 850
          }],
          'class_type': {
            'type': 'oneonone',
            'type_name': '一对一'
          },
          'learning_group': {
            'last_teacher': [
              'yumeng'
            ],
            'students': [{
              'id': 226,
              'username': 'shiqich',
              'lesson_sum': 92.0,
              'first_name': null,
              'last_name': null,
              'nationality': null
            }]
          },
          'tk_class_id': null,
          'course_info': {
            'course_name': 'NN L2',
            'course_level': 2,
            'programme_name': 'Advanced'
          },
          'appointment_status': 'started',
          'virtualclass_type': '声网'
        },
        {
          'scheduled_time': '2019-07-24 07:30',
          'hosts': [{
            'id': 122,
            'username': 'yumeng',
            'lession_num': 850
          }],
          'class_type': {
            'type': 'oneonone',
            'type_name': '一对一'
          },
          'learning_group': {
            'last_teacher': [
              'yumeng'
            ],
            'students': [{
              'id': 206,
              'username': 'wendysgp',
              'lesson_sum': 76.0,
              'first_name': '',
              'last_name': '杨',
              'nationality': 'CN'
            }]
          },
          'tk_class_id': null,
          'course_info': {
            'course_name': 'NN L3',
            'course_level': 3,
            'programme_name': 'Advanced'
          },
          'appointment_status': 'started',
          'virtualclass_type': '声网'
        },
        {
          'scheduled_time': '2019-07-24 06:30',
          'hosts': [{
            'id': 1038,
            'username': 'Lily.Wang',
            'lession_num': 31
          }],
          'class_type': {
            'type': 'oneonone',
            'type_name': '一对一'
          },
          'learning_group': {
            'last_teacher': [
              'Lily.Wang'
            ],
            'students': [{
              'id': 1340,
              'username': '孙颖',
              'lesson_sum': 4.0,
              'first_name': null,
              'last_name': null,
              'nationality': null
            }]
          },
          'tk_class_id': '508885413',
          'course_info': {
            'course_name': 'NN L1',
            'course_level': 1,
            'programme_name': 'Advanced'
          },
          'appointment_status': 'started',
          'virtualclass_type': '拓客'
        },
        {
          'scheduled_time': '2019-07-24 09:00',
          'hosts': [{
            'id': 122,
            'username': 'yumeng',
            'lession_num': 850
          }],
          'class_type': {
            'type': 'oneonone',
            'type_name': '一对一'
          },
          'learning_group': {
            'last_teacher': [
              'yumeng'
            ],
            'students': [{
              'id': 323,
              'username': 'Cathy',
              'lesson_sum': 130.0,
              'first_name': null,
              'last_name': null,
              'nationality': null
            }]
          },
          'tk_class_id': '503494520',
          'course_info': {
            'course_name': 'NN L3',
            'course_level': 3,
            'programme_name': 'Advanced'
          },
          'appointment_status': 'started',
          'virtualclass_type': '拓客'
        },
        {
          'scheduled_time': '2019-07-24 01:00',
          'hosts': [{
            'id': 114,
            'username': 'Yq198512',
            'lession_num': 369
          }],
          'class_type': {
            'type': 'oneonone',
            'type_name': '一对一'
          },
          'learning_group': {
            'last_teacher': [
              'Yq198512'
            ],
            'students': [{
              'id': 565,
              'username': 'DianaV',
              'lesson_sum': 66.0,
              'first_name': null,
              'last_name': null,
              'nationality': null
            }]
          },
          'tk_class_id': '859560045',
          'course_info': {
            'course_name': 'NN L1',
            'course_level': 1,
            'programme_name': 'Advanced'
          },
          'appointment_status': 'started',
          'virtualclass_type': '拓客'
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
    timeChange() {
      if (this.applyDate) {
        this.screenData.start_time = this.applyDate[0]
        this.screenData.end_time = this.applyDate[1]
      } else {
        this.screenData.start_time = null
        this.screenData.end_time = null
      }
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
</style>
