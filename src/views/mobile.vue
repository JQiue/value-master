<script setup lang="ts">
import { onMounted, ref } from 'vue';
import cpuJSON from '../data/cpu.json';
import storageJSON from '../data/storage.json';
import memoryJSON from '../data/memory.json';
import mobilesJSON from '../data/mobiles.json';

const weights = {
  processor: 0.3,
  display: 0.2,
  camera: 0.15,
  storage: 0.1,
  memory: 0.1,
  battery: 0.1,
  design: 0.05
};

// 计算总分
function calcScore(mobile: IMobileInfo): number {
  let total = 0;
  const processorScore = getProcessorScore(mobile);
  const memory = getMemoryScore(mobile);
  const storage = getStorageScore(mobile);
  const battery = getBatteryScore(mobile);
  total = processorScore * weights.processor + memory * weights.memory + storage * weights.storage + battery * weights.battery
  console.log(processorScore, storage, memory, battery);
  console.log(total);
  return total;
}

function getProcessorScore(mobile: IMobileInfo) {
  const processorModel = mobile.processor as keyof typeof cpuJSON;
  return cpuJSON[processorModel].performance;
}

function getStorageScore(mobile: IMobileInfo) {
  const storage = mobile.storage;
  return storageJSON[storage].performance;
}

function getMemoryScore(mobile: IMobileInfo) {
  const memory = mobile.memory;
  return memoryJSON[memory].performance;
}

function getBatteryScore(mobile: IMobileInfo) {
  const battery = mobile.battery;
  if (battery >= 5000) {
    return 100;
  } else if (battery >= 4000) {
    return 90;
  } else if (battery >= 3000) {
    return 80;
  } else {
    return 60
  }
}

// 计算性价比
function calcPricePerformance(mobile: IMobileInfo): string {
  let score = calcScore(mobile);
  let price = mobile.price;

  return (score / price).toFixed(6);
}

function addMobile() {

}

const columns = [
  {
    colKey: "model", title: "型号",
  }, {
    colKey: "processor", title: "处理器",
  },
  {
    colKey: "memory", title: "内存",
  },
  {
    colKey: "storage", title: "闪存",
  },
  {
    colKey: "battery", title: "电池"
  },
  {
    colKey: "ttm", title: "上市时间"
  },
  {
    colKey: "price", title: "上市价格"
  },
  {
    colKey: "性价比指数", title: "性价比指数", cell: "price-performance-ratio"
  }
];

const data = ref<Array<any>>([]);

// function counter(param: {
//   index: number;
//   型号: string;
//   处理器: Cpu;
//   内存: 4 | 8 | 12;
//   闪存: 64 | 128 | 256;
//   电池: 4000 | 4500 | 4600 | 4700 | 5000;
//   上市时间: string;
//   上市价格: number;
// }) {
//   let cpuP = mobileProcessor[Cpu[param.处理器]].performance;
//   let ramP = mobileRam[param.内存].performance;
//   let romP = mobileRom[param.闪存].performance;
//   let batteryP = mobileBatteryCapacity[param.电池].performance;

//   let ppr = (cpuP + ramP + romP + batteryP) / param.上市价格;

//   return ppr.toFixed(6);
// }

onMounted(() => {
  data.value = mobilesJSON.map((item, index) => {
    return {
      ...item, index
    }
  });
})

</script>

<template>
  <t-base-table :columns="columns" :data="data" rowKey="index" hover bordered>
    <template #price-performance-ratio="{ col, row }">
      {{ calcPricePerformance(row) }}
    </template>
  </t-base-table>
</template>