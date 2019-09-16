<template>
   <div>
          
          <screen-item label="日期" :part="2"  style="width:800px;" label-width="60">
            <el-radio-group v-model="dateDay" @change="changeRadion">
               <el-radio-button label="all">全部</el-radio-button>
               <el-radio-button :label="item.date"
                v-for="(item,i) in Lastweek" :key="item.date"
                >{{item.date.slice(5)}}
                <span v-if='i==0'>{{'(今天)'}}</span>
                <span v-if='i==1'>{{'(明天)'}}</span>
                <span v-if='i!=0&&i!=1'>{{'('+item.week+')'}}</span>
                </el-radio-button>
               
            </el-radio-group>
         </screen-item>
         <div class="block">
    
    <el-date-picker
      style="margin-top:10px;"
      v-model="date_day"
      type="date"
      placeholder="选择日期"
      @change="changeDate"
      >
    </el-date-picker>
  </div>
       <br >
       <br>
       <screen-item label="时间" :part="4" :label-width="labelWidth"
        style="margin-top:10px;margin-left:-40px;"
       >
            <el-select v-model="times" placeholder="请选择">
                  <el-option
                  v-for="item in date"
                  :key="item"
                  :label="item"
                  :value="item"
               />
            </el-select>
      </screen-item>
      <screen-item label="版本" :part="4" :label-width="labelWidth"
        style="margin-top:10px;margin-left:-40px;"
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
      <screen-item label="级别" :part="4" :label-width="labelWidth"
        style="margin-top:10px;margin-left:-40px;"
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
       <screen-item label="班型" :part="4" label-width="60">
        <el-select v-model="class_type" placeholder="请选择">
          <el-option
            v-for="item in classOption"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </screen-item>
       <el-dropdown>
          <button style="width:100px;height:40px;background:rgba(92, 194, 208, 1);outline:none;
          margin-top:5px;color:#fff;border-radius:10px;border:0;cursor:pointer;" @click="search()">筛选</button>
   </el-dropdown>
   <div style="width:100%;height:50px;background:#eee;margin-top:30px;display:flex;justify-content:flex-end; align-items:center;">
       <el-input style="width:200px;" v-model="input" placeholder="请输入内容"></el-input>
       <el-button style="width:100px;height:30px;margin:0 20px;cursor:pointer;">结果中查找</el-button>
   </div>
<el-table
    
    ref="singleTable"
    :data="tableData"
    height="250"
 
    border
    highlight-current-row

    style="width: 100%;margin-top:20px;">
    <el-table-column
      type="index"
      width="50">
    </el-table-column>
    <el-table-column
      property="date"
      label="老师"
      width="120">
    </el-table-column>
    <el-table-column
      property="name"
      label="真实姓名"
      width="120">
    </el-table-column>
    <el-table-column
      property="name"
      label="性别">
    </el-table-column>
    <el-table-column
      property="name"
      label="教学年限">
    </el-table-column>
    <el-table-column
      property="name"
      label="评分">
    </el-table-column>
    <el-table-column
      property="name"
      label="手机号">
    </el-table-column>
    <el-table-column
      property="name"
      label="居住国">
    </el-table-column>
  </el-table>
 
   </div>
</template>

<script>
import {
  searchTeacher
} from '@/api/tutorManagement/'
  export default{
      data(){
         return {
            dateDay:"",//点击点击周几
            Lastweek:[],//实时更新当前一周信息
            labelWidth: '100',
            programme:"",//版本
            course_level:"",//级别
            class_type:"",//班型
            date_day:"",//日期  自己选择的
            times:"",//时间
            value1:"",//选择日历的时间
            applyDate:[],//日历
            screenData:{
                
            },
            tableData: [{
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        },{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }],
        currentRow: null,
            input:"",
               timer: "",//定义一个定时器的变量
               currentTime: new Date(), // 获取当前时间
               date:["全部","0:00","0:30","1:00","1:30","2:00","2:30","3:00","3:30","4:00","4:30","5:00","5:30",
               "6:00","6:30","7:00","7:30","8:00","8:30","9:00","9:30","10:00","10:30","11:00","11:30","12:00","12:30","13:00","13:30","14:00","14:30","15:00","15:30","16:00","16:30","17:00","17:30","18:00","18:30","19:00","19:30","20:00","20:30","21:00","21:30","22:00","22:30","23:00"],
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
               level:[
                  {value:"",lable:"全部"},
                  {value:"1",lable:"Level1"},
                  {value:"2",lable:"Level2"},
                  {value:"3",lable:"Level3"},
                  {value:"4",lable:"Level4"},
                  {value:"5",lable:"Level5"},
                  {value:"6",lable:"Level6"},
               ],
               classOption: [{
                              value: '',
                              label: '全部'
                           },{
                              value: 'oneonone',
                              label: '一对一'
                           },{
                              value: 'smallclass',
                              label: '小班课'
                           }],
       }
      },
      beforeCreate(){
         
      },
      created() {
         
      },
      mounted(){
         this.getWeek();
        },
      methods: {
           search(){//点击筛选
                var information={
                     programme:this.programme,
                     course_level:this.course_level,
                     class_type:this.class_type,
                     date_day:this.date_day?this.timeChange(this.date_day):this.dateDay,
                     times:this.times
                }
                console.log(information)
               //   searchTeacher(information).then(res=>{
               //      console.log(res)
               //   })
           },
         // 日期切换
            changeRadion(val) {
               this.date_day=val?"":this.date_day
               this.applyDate = []
               this.tableType = val
               this.screenData.start_time = null
               this.screenData.end_time = null
               this.type = 1
               this.screenData.appoint_status = ''
            },
            changeDate(){
                 console.log('改变日期')
                 this.dateDay="";
            },
           getWeek(){
              var over=this.fun_date(7);//七天后日期
              var start=new Date();//当前时间
              var start=this.timeChange(start).slice(this.timeChange(start).length-2)
              var end=over.slice(over.length-2)
              console.log()
              var weekArray = new Array("周日", "周一", "周二", "周三", "周四", "周五", "周六");
              var week = weekArray[new Date().getDay()];
              for(var i=start;i<end;i++){
                 var obj={};
                 obj.date=over.slice(0,-2)+i;
                 obj.week=weekArray[new Date(over.slice(0,-2)+i).getDay()]
                 this.Lastweek.push(obj)
              }
          },
          fun_date(aa){//得到后七天的日期
            var date1 = new Date(),
            time1=date1.getFullYear()+"-"+(date1.getMonth()+1)+"-"+date1.getDate();//time1表示当前时间
            var date2 = new Date(date1);
            date2.setDate(date1.getDate()+aa);
            var time2 = date2.getFullYear()+"-"+(date2.getMonth()+1)+"-"+date2.getDate();
            return time2;
          },
           getMyDay(date){//得到星期几
               var week;
               if(date.getDay()==0) week="周日";
               if(date.getDay()==1) week="周一";
               if(date.getDay()==2) week="周二";
               if(date.getDay()==3) week="周三";
               if(date.getDay()==4) week="周四";
               if(date.getDay()==5) week="周五";
               if(date.getDay()==6) week="周六";
               return week;
            },
            timeChange(time){
               var d = new Date(time);
               var datetime=d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
               return datetime
            }
         },
      
        beforeDestroy() {
         
        }

   }
</script>