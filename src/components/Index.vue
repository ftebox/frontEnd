<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <el-icon>
          <Opportunity/>
        </el-icon>
        <span style="display: flex;align-items: center;margin-left: 10px;">套餐详情</span>
      </div>
    </template>
    <div style="width: 100%;border: none;text-align: left;">
      <span style="display: block;margin: 5px 10px 5px 10px;">订阅到期时间：{{ dqsj }}</span>
      <el-progress
          :text-inside="false"
          :show-text="false"
          :stroke-width="10"
          :percentage=pre
          status="success"
          style="margin: 5px 10px 5px 10px"
      />
      <span style="display: block;margin: 5px 10px 5px 10px;font-size: 12px">剩余 {{ syll }} / 总计 {{ zjll }}</span>
    </div>
  </el-card>

  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <el-icon>
          <Flag/>
        </el-icon>
        <span style="display: flex;align-items: center;margin-left: 10px;">在线设备</span>
      </div>
    </template>
    <div style="width: 100%;border: none;text-align: left;">
      <span style="display: block;margin: 5px 10px 5px 10px;">在线设备/设备限制数：<span v-text="zxsb"></span></span>
      <span style="display: block;margin: 5px 10px 5px 10px;font-size: 12px">上次使用：{{ sysj }}</span>
    </div>
  </el-card>

  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <el-icon>
          <Briefcase/>
        </el-icon>
        <span style="display: flex;align-items: center;margin-left: 10px;">软件下载</span>
      </div>
    </template>
    <div style="width: 100%;border: none;text-align: left;display: flex;justify-content: space-evenly;">
      <el-button type="primary">安卓端</el-button>
      <el-button type="success">电脑端</el-button>
    </div>
  </el-card>

  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <el-icon>
          <GoodsFilled/>
        </el-icon>
        <span style="display: flex;align-items: center;margin-left: 10px;">订阅链接</span>
      </div>
    </template>
    <div style="width: 100%;border: none;display: flex;justify-content: space-evenly;">
      <el-button type="primary" @click="dialogVisible = true;change('V2ray')">V2ray</el-button>
      <el-button type="success" @click="dialogVisible = true;change('SSR')">SSR</el-button>
      <el-button type="info" @click="dialogVisible = true; change('Clash')">Clash</el-button>
    </div>
  </el-card>

  <el-dialog
      v-model="dialogVisible"
      title="订阅地址"
      width="340px"
      class="dia"
  >
    <span class="spA"><el-icon size="16" style="vertical-align: middle"><Lightning/></el-icon>
      {{ tempName }}默认订阅地址：
    </span>
    <el-input v-model="input" :value=tempA>
      <template #append>
        <el-icon @click="copy(tempA)">
          <DocumentCopy/>
        </el-icon>
      </template>
    </el-input>
    <span :class=spb><el-icon size="16" style="vertical-align: middle"><Lightning/></el-icon>
      {{ tempName }}备用订阅地址：
    </span>
    <el-input :class=cla v-model="input" :value=tempB>
      <template #append>
        <el-icon @click="copy(tempB)">
          <DocumentCopy/>
        </el-icon>
      </template>
    </el-input>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">关闭</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import {onBeforeMount, onMounted, ref} from 'vue'
import {ElMessage} from 'element-plus'
import axios from "axios";
import {Briefcase, DocumentCopy, Flag, GoodsFilled, Opportunity} from "@element-plus/icons-vue";

onBeforeMount(async () => {
  await axios.get("/api").then(
      (rep) => {
        zxsb.value = rep.data.data.zxsb;
        sysj.value = rep.data.data.sysj;
        syll.value = rep.data.data.syll;
        dqsj.value = rep.data.data.dqsj;
        v2rayurl.value = rep.data.data.v2rayurl;
        v2rayBakurl.value =rep.data.data.v2rayBakurl;
        SSRurl.value = rep.data.data.SSRurl;
        SSRBakurl.value = rep.data.data.SSRBakurl;
        Clash.value = rep.data.data.Clash;
        let preTmp = rep.data.data.syll;
        const index = preTmp.indexOf("G");
        if(index===-1){
          pre.value = 100;
        }else {
          pre.value = (Number(preTmp.substring(0,index))/1024).toFixed(2)*100
        }

      })
})

const dialogVisible = ref(false)


const input = ref('')

let tempA = "";
let tempB = "";
let tempName = ""
let cla = "";
let spb = "spB"
const zxsb = ref("");
const sysj = ref("");
const syll = ref("");
const dqsj = ref("");
const zjll = "1049 GB";
const pre = ref(0);
const v2rayurl = ref("");
const v2rayBakurl = ref("");
const SSRurl = ref("");
const SSRBakurl = ref("");
const Clash = ref("");

const copy = (e) => {
  navigator.clipboard.writeText(e);
  ElMessage('链接接已复制到剪贴板！')

}

const change = (e) => {
  switch (e) {
    case 'V2ray':
      tempName = e;
      tempA = v2rayurl;
      tempB = v2rayBakurl;
      cla = "";
      spb = "spB"
      break;
    case 'SSR':
      tempName = e;
      tempA = SSRurl;
      tempB = SSRBakurl;
      cla = "";
      spb = "spB"
      break;
    case 'Clash':
      tempName = e;
      tempA = Clash;
      cla = "none";
      spb = "none"
      break;
  }
}


</script>

<style scoped>
.dialog-footer button:first-child {
  margin-right: 10px;
}

.card-header {
  display: flex;
  align-items: center;
}

@media screen and (max-width: 480px) {
  .box-card {
    width: 330px !important;
    font-size: 16px;
  }
}

.box-card {
  width: 480px;
  margin: 20px;
}

.spA, .spB {
  display: block;
  margin: 10px;
}

.none {
  display: none;
}

/*.dia {*/
/*  text-align: left;*/
/*}*/

</style>