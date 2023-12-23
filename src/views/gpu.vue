<template>
  <t-table :columns="columns" :data="data" rowKey="index" hover bordered>
    <template #price-performance-ratio="{ col, row }">
      {{ calcPricePerformance(row) }}
    </template>
  </t-table>
  <t-space>
    <t-input v-model:value="gpuForm.model" placeholder="型号" autocomplete></t-input>
    <t-input v-model:value="gpuForm.cuda" placeholder="流处理器" autocomplete></t-input>
    <t-input v-model:value="gpuForm.clockspeed" placeholder="基础频率(MHZ)" autocomplete></t-input>
    <t-input v-model:value="gpuForm.turbospeed" placeholder="加速频率(MHZ)" autocomplete></t-input>
    <t-input v-model:value="gpuForm.memSize" placeholder="显存大小" autocomplete></t-input>
    <t-input v-model:value="gpuForm.memType" placeholder="显存类型" autocomplete></t-input>
    <t-input v-model:value="gpuForm.process" placeholder="制程" autocomplete></t-input>
    <t-input v-model:value="gpuForm.tdp" placeholder="TDP(W)" autocomplete></t-input>
    <t-input v-model:value="gpuForm.price" placeholder="上市价格"></t-input>
    <t-input v-model:value="gpuForm.ttm" placeholder="上市时间"></t-input>
    <t-button @click="handleAdd">添加</t-button>
  </t-space>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import pcGPU from '../data/pc-gpu.json';
import { Input } from 'tdesign-vue-next';
import { setGPUData } from '@/storage';

const columns = [
  {
    colKey: "model", title: "型号",
  }, {
    colKey: "cuda", title: "流处理器(CUDA)",
  },
  {
    colKey: "clockspeed", title: "基础频率(MHZ)",
  },
  {
    colKey: "turbospeed", title: "加速频率(MHZ)",
  },
  {
    colKey: "tdp", title: "TDP(W)"
  },
  {
    colKey: "process", title: "制程(nm)"
  },
  {
    colKey: "memSize", title: "显存大小(MB)"
  },
  {
    colKey: "memType", title: "显存类型"
  },
  {
    colKey: "ttm", title: "上市时间"
  },
  {
    colKey: "price", title: "上市价格", edit: {
      component: Input,
      props: {
        clearable: true,
      },
      on: (editContext: any) => ({
        onChange: (params: any) => {
          console.log('status changed', editContext, params);
        },
      }),
      onEdited: (context: { rowIndex: number; newRowData: any; }) => {
        data.value.splice(context.rowIndex, 1, context.newRowData);
        console.log('Edit Framework:', context);
      },
    }
  },
  {
    colKey: "性价比指数", title: "性价比指数", cell: "price-performance-ratio"
  }
];
const weights = {
  cuda: 0.3,
  clockspeed: 0.2,
  memSize: 0.2,
  tdp: 0.15,
  process: 0.1
};

const data = ref<Array<any>>([]);
const additionalData = ref<Array<any>>([]);
const gpuForm = reactive({
  model: '',
  cuda: '',
  clockspeed: '',
  turbospeed: '',
  tdp: '',
  process: '',
  memSize: '',
  memType: '',
  output: {
    dvi: true,
    hdmi: true,
    vga: true
  },
  ttm: '',
  price: ''
});

const handleAdd = () => {
  data.value.push({ ...gpuForm });
  additionalData.value.push({ ...gpuForm });
  setGPUData(additionalData.value);
}

// 计算性价比
function calcPricePerformance(gpu: IGPUInfo): string {
  let score = calcScore(gpu);
  let price = gpu.price;

  return (score / price).toFixed(6);
}

// 计算总分
function calcScore({ cuda, clockspeed, memSize, tdp, process }: IGPUInfo): number {
  let total = 0;
  const cudaScore = getCudaScore(cuda);
  const clockspeedScore = getClockspeedScore(clockspeed);
  const memSizeScore = getMemSizeScore(memSize);
  const tdpScore = getTdpScore(tdp);
  const progressScore = getProgressScore(process);
  // 根据权重计算比分
  total = cudaScore * weights.cuda;
  // total = cudaScore * weights.cuda + clockspeedScore * weights.clockspeed + storage * weights.storage + battery * weights.battery
  console.log(cudaScore, clockspeedScore, memSizeScore, tdpScore, progressScore);
  console.log(total);
  return total;
}

function getCudaScore(cuda: number) {
  return cuda / 100;
}

function getClockspeedScore(clockspeed: number) {
  return clockspeed / 700;
}

function getMemSizeScore(memSize: number) {
  return memSize / 1024;
}

function getTdpScore(tdp: number) {
  return 10 / tdp;
}

function getProgressScore(process: number) {
  return 10 / process;
}

onMounted(() => {
  data.value = pcGPU.map((item, index) => {
    return {
      ...item, index
    }
  });
})
</script>

<style scoped></style>