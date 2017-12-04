<template>
  <div>
       <!-- {{user}}  -->
    <div class="options-area row">
        <div class="col-md-2">
            <label>游戏</label>
            <v-select class="select" @selected="selectGame" v-model="gameSelect" 
            options-value="id" options-label="name" :options="gameList" placeholder="请选择"></v-select>
        </div>
        <div class="col-md-2">
            <label>公司</label>
            <v-select class="select" @selected="selectCompany" v-model="companySelect" 
            options-value="id" options-label="name" :options="companyList" placeholder="请选择"></v-select>
        </div>
        <div class="col-md-2">
            <label>平台</label>
            <v-select class="select" @selected="selectPlatform" v-model="platformSelect" 
            options-value="id" options-label="name" :options="platformList"  placeholder="请选择"></v-select>
        </div>
        <div class="col-md-2">
            <label>渠道</label>
<!-- search    name="animals[]" limit="3"  multiple justified required disabled  clear-button close-on-select-->
            <v-select class="select" @selected="selectMstchannel" v-model="mstchannelSelect" 
            options-value="id" options-label="name" :options="mstchannelList"   search  placeholder="请选择"></v-select>
        </div>
        <div class="col-md-2">
            <button @click="search" class="btn btn-info">查询</button>
        </div>
        <div class="col-md-2">
            <button @click="add" class="btn btn-primary">申请渠道号</button>
        </div>
    </div>
    <!-- <div style="clear:both;"></div> -->
    <div class="table-responsive">
        <table class="table table-bordered">
            <thead>
                <tr>
                    <!-- <th>序号</th> -->
                    <th v-for="thHeader in tableHeaders">
                        {{thHeader}}
                    </th>
                    <th>操作</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item,index) in datas">
                    <!-- <th>{{index+1}}</th> -->
                     <td>{{null}}</td>
                    <td>{{item.mst_channel_name}}</td>
                    <td>{{item.mst_contract_subject}}</td>
                    <td>{{item.name2}}</td>
                    <td>{{item.no}}</td>
                    <td>{{item.type}}</td>
                    <td>{{item.type2}}</td>
                    <td>
                        <button class="btn btn-success">查看</button>
                    </td>
                </tr>
            </tbody>
        </table>
        <spinner ref="spinner" global v-model="spinner" size="sm"  text="正在查询..."></spinner>
    </div>

    <modal v-model="addModalisShow" effect="fade" title="新增渠道号" >
        <!-- custom header -->
        <div slot="modal-header" class="modal-header">
            <h4 class="modal-title"> 申请渠道号 </h4>
        </div>


         <div class="options-area row">
            <div class="col-md-6">
                <label>游&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;戏</label>
                <v-select class="select"  v-model="gameSelect2"  required  
                
                options-value="id" options-label="name"  @selected="getGameText" :options="gameList" placeholder="请选择"></v-select>
            </div>
               <div class="col-md-6">
                <label>所属公司</label>
                <v-select class="select"  v-model="companySelect2"   @selected="getCompnayText"
                options-value="id" options-label="name" :options="companyList" placeholder="请选择"></v-select>
            </div>
         </div>
         <div class="options-area row">
               <div class="col-md-6">
                  
                <label>平&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;台</label>
                <v-select class="select"  @selected="selectPlatform2" v-model="platformSelect2" 
                options-value="id" options-label="name" :options="platformList" placeholder="请选择"></v-select>
            </div>
               <div class="col-md-6"> 
                <label>语&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;言</label>
                <v-select class="select"  v-model="languageSelect"  @selected="getLanguageText"
                options-value="id" options-label="name" :options="languageList" placeholder="请选择"></v-select>
            </div>
         </div>
          <div class="options-area row">
               <div class="col-md-6">
                  
                <label>主&nbsp;&nbsp;渠&nbsp;&nbsp;道</label>
                <v-select class="select" @selected="selectMstChannel2"  v-model="mstchannelSelect2" 
                options-value="id" options-label="name" :options="mstchannelList" placeholder="请选择"></v-select>
            </div>
               <div class="col-md-6"> 
                <label>子&nbsp;&nbsp;渠&nbsp;&nbsp;道</label>
                <v-select class="select"  v-model="subchannelSelect"   @selected="getSubchannelText"
                options-value="id" options-label="name" :options="subchannelList" placeholder="请选择"></v-select>
            </div>
         </div>
         <div class="options-area row">
               <div class="col-md-6">
                  
                <label>运营方式</label>
                <v-select class="select"  v-model="operatewaySelect"  @selected="getOperatewayText"
                options-value="id" options-label="name" :options="operatewayList" placeholder="请选择"></v-select>
            </div>
               <div class="col-md-6"> 
                <label>游戏版本</label>
                <v-select class="select"  v-model="gameversionSelect"  @selected="getGameversionText"
                options-value="id" options-label="name" :options="gameversionList" placeholder="请选择"></v-select>
            </div>
         </div>
          <div class="options-area row">
               <div class="col-md-6">
                  
                <label>设备类型</label>
                <v-select class="select"  v-model="devicetypeSelect"  @selected="getDevicetypeText"
                options-value="id" options-label="name" :options="devicetypeList" placeholder="请选择"></v-select>
            </div>
               <div class="col-md-6"> 
                <label>门&nbsp;&nbsp;标&nbsp;&nbsp;识</label>
                <v-select class="select"  v-model="gateSelect"  @selected="getGateText"
                options-value="id" options-label="name" :options="gateList" placeholder="请选择"></v-select>
            </div>
         </div>
          <div class="options-area row">
               <div class="col-md-6">
                  
                <label>运&nbsp;&nbsp;营&nbsp;&nbsp;商</label>
                <v-select class="select"  v-model="operatorSelect"  @selected="getOperatorText"
                options-value="id" options-label="name" :options="operatorList" placeholder="请选择"></v-select>
            </div>
               <div class="col-md-6"> 
                <label>区&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;域</label>
                <v-select class="select"  v-model="areaSelect"  @selected="getAreaText"
                options-value="id" options-label="name" :options="areaList" placeholder="请选择"></v-select>
            </div>
         </div>
        <!-- <form>
           <bs-input 
                label="Username"
                placeholder="Username can't start with a number."
                pattern="^[a-z][a-z0-9]+$"
                required
                icon
                ></bs-input>
                      :maskss="maskss"
                      v-model="input" 
                       help="Only allows lowercase letters and numbers."
                error="Insert username"
                 readonly
                  minlength="5"
        </form> -->
        <div slot="modal-footer" class="modal-footer">
            <button type="button" class="btn btn-default" @click="addModalisShow  = false">取消</button>
            <button type="button" class="btn btn-success" @click="confirm">确定</button>
        </div>
</modal>


 <modal v-model="addModalisSave" effect="fade" title="确认渠道号信息" >
        <!-- custom header -->
        <div slot="modal-header" class="modal-header">
            <h4 class="modal-title"> 确认渠道号信息 </h4>
        </div>
         <div class="options-area row">
            <div class="col-md-12">
                <label>游&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;戏：</label>
                <label>{{this.gameValue}}</label>
            </div> 
         
    
            <div class="col-md-12">
                <label>所属公司：</label>
                <label>{{this.companyValue}}</label>
            </div> 
      
            <div class="col-md-12">
                <label>平&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;台：</label>
                <label>{{this.platformValue}}</label>
            </div> 
       
            <div class="col-md-12">
                <label>语&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;言：</label>
                <label>{{this.languageValue}}</label>
            </div> 
       
            <div class="col-md-12">
                <label>主&nbsp;&nbsp;渠&nbsp;&nbsp;道：</label>
                <label>{{this.mstchannelValue}}</label>
            </div> 
       
            <div class="col-md-12">
                <label>子&nbsp;&nbsp;渠&nbsp;&nbsp;道：</label>
                <label>{{this.subchannelValue}}</label>
            </div> 
        
            <div class="col-md-12">
                <label>运营方式：</label>
                <label>{{this.operatewayValue}}</label>
            </div> 
        
            <div class="col-md-12">
                <label>游戏版本：</label>
                <label>{{this.gameversionValue}}</label>
            </div> 
       
            <div class="col-md-12">
                <label>设备类型：</label>
                <label>{{this.devicetypeValue}}</label>
            </div> 
        
            <div class="col-md-12">
                <label>门&nbsp;&nbsp;标&nbsp;&nbsp;识：</label>
                <label>{{this.gateValue}}</label>
            </div> 
        
            <div class="col-md-12">
                <label>运&nbsp;&nbsp;营&nbsp;&nbsp;商：</label>
                <label>{{this.operatorValue}}</label>
            </div> 
        
            <div class="col-md-12">
                <label>区&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;域：</label>
                <label>{{this.areaValue}}</label>
            </div> 
        </div>
        <!-- <form>
           <bs-input 
                label="Username"
                placeholder="Username can't start with a number."
                pattern="^[a-z][a-z0-9]+$"
                required
                icon
                ></bs-input>
                      :maskss="maskss"
                      v-model="input" 
                       help="Only allows lowercase letters and numbers."
                error="Insert username"
                 readonly
                  minlength="5"
        </form> -->
        <div slot="modal-footer" class="modal-footer">
            <button type="button" class="btn btn-default" @click="addModalisSave  = false">返回</button>
            <button type="button" class="btn btn-success" @click="sureAdd">保存</button>
        </div>
</modal>

 <alert  v-model="addInfoAlertSuc"  placement="top-right" duration="3000" type="success" width="300px" dismissable>
    <span class="icon-ok-circled alert-icon-float-right"></span>
    <strong>提示!</strong>
    <p>此申请单已经成功生成渠道号.</p>
 </alert>
  <alert  v-model="addInfoAlertDan"  placement="top-right" duration="3000" type="danger" width="300px" dismissable>
    <span class="icon-ok-circled alert-icon-float-right"></span>
    <strong>小心!</strong>
    <p>此申请单未能成功生成渠道号,请查看原因.</p>
 </alert>
 <!-- :show.sync="showRight" -->
    <!-- <modal v-model="addModalisShow" title="新增渠道号" cancel-text="取消" ok-text="保存" @ok="sureAdd">
        hello i'm modal
    </modal> -->
    
  </div>
</template>

<script>
import {modal, select,spinner,input,alert } from 'vue-strap'

export default {
  name: 'eightingAdmin',
  components: {modal:modal, VSelect:select,spinner:spinner,bsInput:input,alert:alert},
  data(){
      return{
           user:null,
           tableHeaders:["游戏","主渠道名称","子渠道名称","渠道号","平台","设备类型","语言","区域","运营方式","运营商","创建人","创建时间"],
           gameList:[],
           gameSelect:null,
           companyList:[],
           companySelect:null,
           platformList:[],
           platformSelect:null,
           mstchannelList:[],
           mstchannelSelect:null,
           gameSelect2:null,
           companySelect2:null,
           platformSelect2:null,
           mstchannelSelect2:null,
           languageSelect:null,
            languageList:[],
            subchannelSelect:null,
            subchannelList:[],
            operatewaySelect:null,
            operatewayList:[],
            gameversionSelect:null,
            gameversionList:[],
            devicetypeSelect:null,
            devicetypeList:[],
            gateSelect:null,
            gateList:[],
            operatorSelect:null,
            operatorList:[],
            areaSelect:null,
            areaList:[],
            datas:null,
            addModalisShow:false,
            addModalisSave:false,
            spinner:false,
            addInfoAlertSuc:false,
            addInfoAlertDan:false,
            gameValue:null,
            companyValue:null,
            platformValue:null,
            mstchannelValue:null,
            languageValue:null,
            subchannelValue:null,
            operatewayValue:null,
            gameversionValue:null,
            devicetypeValue:null,
            gateValue:null,
            operatorValue:null,
            areaValue:null
      }
  },
  created(){

    //填充游戏下拉列表
    this.$axios.get("api/queryinfo/gameinfo").then(res=>{
         console.log("====gameinfo",res)
       this.gameList=res;
     });

    //填充公司下拉列表
    this.$axios.get("api/queryinfo/companyinfo").then(res=>{
         console.log("====companyinfo",res)
       this.companyList=res;
     });

    //填充平台下拉列表
    this.$axios.get("api/queryinfo/platforminfo").then(res=>{
         console.log("====platforminfo",res)
       this.platformList=res;
     });

     //填充渠道下拉列表
    this.$axios.get("api/queryinfo/mstchannelinfo").then(res=>{
         console.log("====mstchannelinfo",res)
       this.mstchannelList=res;
     });

    //填充语言下拉列表
    this.$axios.get("api/queryinfo/languageinfo").then(res=>{
         console.log("====languageinfo",res)
       this.languageList=res;
     });

    //填充运营方式下拉列表
        this.$axios.get("api/queryinfo/operatewayinfo").then(res=>{
            console.log("====operatewayinfo",res)
        this.operatewayList=res;
        });


       //填充游戏版本下拉列表
    this.$axios.get("api/queryinfo/gameversioninfo").then(res=>{
         console.log("====gameversioninfo",res)
       this.gameversionList=res;
     });

    //填充门标识下拉列表
    this.$axios.get("api/queryinfo/gateinfo").then(res=>{
        console.log("====gateinfo",res)
    this.gateList=res;
    });

    //填充运营商下拉列表
    this.$axios.get("api/queryinfo/operatorinfo").then(res=>{
        console.log("====operatorinfo",res)
    this.operatorList=res;
    });

     //填充区域下拉列表
    this.$axios.get("api/queryinfo/areainfo").then(res=>{
        console.log("====areainfo",res)
    this.areaList=res;
    });

      //填充表格数据
      this.$axios.get("api/channel18/info?userid=1").then(res=>{
         console.log("====channel18",res)
        this.datas=res;
     });

  },
  methods:{
     selectGame(){

      },
      selectCompany(){

      },
      selectPlatform(){

      },
      selectMstchannel(){

      },
      getGameText(val){
          this.gameValue = val[0];
          console.dir(val[0]);
      },
      getCompnayText(val){
          this.companyValue = val[0];
          console.dir(val[0]);
      },
    getLanguageText(val){
          this.languageValue = val[0];
          console.dir(val[0]);
      },
      selectMstChannel2(val){
          this.mstchannelValue = val[0];
          console.dir(val[0]);
           let mst_channel_id = this.mstchannelSelect2;
        //填充子渠道下拉列表
            this.$axios.get("api/queryinfo/subchannelinfo",
            {params:{ 'mst_channel_id': mst_channel_id}}
            ).then(res=>{
                console.log("====subchannelinfo",res)
            this.subchannelList=res;
            });

      },
      selectPlatform2(val){
        this.platformValue = val[0];
          console.dir(val[0]);

           let platform_id = this.platformSelect2;
        //填充设备类型下拉列表
            this.$axios.get("api/queryinfo/devicetypeinfo",
            {params:{ 'platform_id': platform_id}}
            ).then(res=>{
                console.log("====devicetypeinfo",res)
            this.devicetypeList=res;
            });
      },
        getSubchannelText(val){
          this.subchannelValue = val[0];
          console.dir(val[0]);
      },
       getOperatewayText(val){
          this.operatewayValue= val[0];
          console.dir(val[0]);
      },
       getGameversionText(val){
          this.gameversionValue = val[0];
          console.dir(val[0]);
      },getDevicetypeText(val){
          this.devicetypeValue = val[0];
          console.dir(val[0]);
      },getGateText(val){
          this.gateValue = val[0];
          console.dir(val[0]);
      },getOperatorText(val){
          this.operatorValue = val[0];
          console.dir(val[0]);
      },getAreaText(val){
          this.areaValue = val[0];
          console.dir(val[0]);
      },
      
      search(){
          this.$root.$emit('spinner::show')
        
          let game_id = this.gameSelect;
          let company_id = this.companySelect;
          let platform_id = this.platformSelect;
          let mst_channel_id = this.mstchannelSelect;

        this.$axios.get("api/channel18/info",
        {params:
         { 'game_id': game_id,
         'company_id': company_id,
         'platform_id': platform_id,
         'mst_channel_id': mst_channel_id}
        }).then(res=>{
            console.log("==== search info result:",res)
            this.datas = res
           this.$root.$emit('spinner::hide')
        })

        //   if(this.gameSelect){
        //       console.log("goSearch!!","gameSelect:",this.gameSelect)
        //   }

      },
      add(){
          this.addModalisShow = true;
      },confirm(){
        //   this.addModalisShow = false;
          this.addModalisSave = true;
        //    this.gameValue = this.gameSelect2.text;
          let company_id = this.companySelect2;
          let platform_id = this.platformSelect2;
          let mst_channel_id = this.mstchannelSelect2;
          let sub_channel_id = this.subchannelSelect;
          let language_id = this.languageSelect;
          let operate_way_id = this.operatewaySelect;
          let game_version_id = this.gameversionSelect;
          let device_type_id = this.devicetypeSelect;
          let gate_id = this.gateSelect;
          let operator_id = this.operatorSelect;
          let area_id = this.areaSelect;

      },sureAdd(){
          let game_id = this.gameSelect2;
          let company_id = this.companySelect2;
          let platform_id = this.platformSelect2;
          let mst_channel_id = this.mstchannelSelect2;
          let sub_channel_id = this.subchannelSelect;
          let language_id = this.languageSelect;
          let operate_way_id = this.operatewaySelect;
          let game_version_id = this.gameversionSelect;
          let device_type_id = this.devicetypeSelect;
          let gate_id = this.gateSelect;
          let operator_id = this.operatorSelect;
          let area_id = this.areaSelect;


    this.$axios.get("api/channel18/addinfo",
            {params:
                { 'game_id': game_id,
                'company_id': company_id,
                'platform_id': platform_id,
                'mst_channel_id': mst_channel_id,
                'sub_channel_id': sub_channel_id,
                'language_id': language_id,
                'operate_way_id': operate_way_id,
                'game_version_id': game_version_id,
                'device_type_id': device_type_id,
                'gate_id': gate_id,
                'operator_id': operator_id,
                'area_id': area_id
                }
            }).then(res=>{
                console.log("==== addchanel18info info result:",res)

                if(res.result = "success"){
                     this.addInfoAlertSuc = true;

                        let game_id = this.gameSelect;
                        let company_id = this.companySelect;
                        let platform_id = this.platformSelect;
                        let mst_channel_id = this.mstchannelSelect;

                        this.$axios.get("api/channel18/info",
                        {params:
                        { 'game_id': game_id,
                        'company_id': company_id,
                        'platform_id': platform_id,
                        'mst_channel_id': mst_channel_id}
                        }).then(res=>{
                            console.log("==== search info result:",res)
                            this.datas = res
                        })

                      this.addModalisShow = false;


                      
                }else{
                   this.addInfoAlertDan = true;
                 
                }
                // this.datas = res
            this.$root.$emit('spinner::hide')
            })
          
      }
  },


}
</script>
<style>
    .options-area label{
        padding:0 10px;
        font-size:15px;
    }
    .options-area .select{
        min-width:80px;
    }
</style>
