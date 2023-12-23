<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import cpuJSON from '../data/cpu.json';
import storageJSON from '../data/storage.json';
import memoryJSON from '../data/memory.json';
import mobilesJSON from '../data/mobiles.json';
import { Input, Select } from 'tdesign-vue-next';
import { setMobileData, getMobileData } from '../storage/index';

const weights = {
  processor: 0.30,
  memory: 0.3,
  storage: 0.25,
  battery: 0.15,
};

// 计算总分
function calcScore(mobile: IMobileInfo): number {
  let total = 0;
  const processorScore = getProcessorScore(mobile);
  const memory = getMemoryScore(mobile);
  const storage = getStorageScore(mobile);
  const battery = getBatteryScore(mobile);
  // 根据权重计算比分
  total = processorScore * weights.processor + memory * weights.memory + storage * weights.storage + battery * weights.battery
  return total;
}

function getProcessorScore(mobile: IMobileInfo) {
  const processorModel = mobile.processor as keyof typeof cpuJSON;
  try {
    return cpuJSON[processorModel].performance;
  } catch (error) {
    throw new Error("没有该处理器的性能指标");
  }
}

function getStorageScore(mobile: IMobileInfo) {
  const storage = mobile.storage;
  try {
    return storageJSON[storage].performance;
  } catch (error) {
    throw new Error("没有该闪存的性能指标");
  }
}

function getMemoryScore(mobile: IMobileInfo) {
  const memory = mobile.memory;
  try {
    return memoryJSON[memory].performance;
  } catch (error) {
    throw new Error("没有该内存的性能指标");
  }
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

const mobileForm = reactive({
  model: "",
  processor: "",
  memory: "",
  storage: "",
  battery: "",
  ttm: "",
  price: ""
})

const selectCpuList = ref(Object.keys(cpuJSON));
const selectMemoryList = ref(Object.keys(memoryJSON));
const selectStorageList = ref(Object.keys(storageJSON));

const columns = [
  {
    colKey: "model", title: "型号",
    edit: {
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
        setMobileData(data.value.slice(mobilesJSON.length));
        console.log('Edit Framework:', context);
      },
    }
  },
  {
    colKey: "processor",
    title: "处理器",
    edit: {
      component: Select,
      props: {
        clearable: true,
        options: selectCpuList.value.map((cpu) => {
          return {
            label: cpu,
            value: cpu,
          }
        }),
      },
      on: (editContext: any) => ({
        onChange: (params: any) => {
          console.log('status changed', editContext, params);
        },
      }),
      onEdited: (context: { rowIndex: number; newRowData: any; }) => {
        data.value.splice(context.rowIndex, 1, context.newRowData);
        setMobileData(data.value.slice(mobilesJSON.length));
        console.log('Edit Framework:', context);
      },
    }
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
    colKey: "price",
    title: "上市价格",
    edit: {
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
        setMobileData(data.value.slice(mobilesJSON.length));
        console.log('Edit Framework:', context);
      },
    }
  },
  {
    colKey: "性价比指数", title: "性价比指数", cell: "price-performance-ratio"
  }
];

const data = ref<Array<any>>([]);
const additionalData = ref<Array<any>>([]);

function handleAdd() {
  data.value.push({ ...mobileForm });
  additionalData.value.push({ ...mobileForm });
  setMobileData(additionalData.value);
}

onMounted(() => {
  data.value = mobilesJSON.map((item, index) => {
    return {
      ...item, index
    }
  });
  const mobileData = getMobileData();
  if (mobileData) {
    data.value.concat(mobileData);
    for (const d of mobileData) {
      data.value.push(d);
      additionalData.value.push(d);
    }
  }
})
</script>

<template>
  <t-table :columns="columns" :data="data" rowKey="index" hover bordered>
    <template #price-performance-ratio="{ col, row }">
      {{ calcPricePerformance(row) }}
    </template>
  </t-table>
  <t-space>
    <t-input v-model:value="mobileForm.model" placeholder="型号" autocomplete></t-input>
    <t-select v-model:value="mobileForm.processor" placeholder="处理器">
      <t-option v-for="cpu in selectCpuList" :key="cpu" :label="cpu" :value="cpu" />
    </t-select>
    <t-select v-model:value="mobileForm.memory" placeholder="内存">
      <t-option v-for="memory in selectMemoryList" :key="memory" :label="memory" :value="memory" />
    </t-select>
    <t-select v-model:value="mobileForm.storage" placeholder="闪存">
      <t-option v-for="storage in selectStorageList" :key="storage" :label="storage" :value="storage" />
    </t-select>
    <t-input v-model:value="mobileForm.battery" placeholder="电池"></t-input>
    <t-input v-model:value="mobileForm.price" placeholder="上市价格"></t-input>
    <t-input v-model:value="mobileForm.ttm" placeholder="上市时间"></t-input>
    <t-button @click="handleAdd">添加</t-button>
  </t-space>
</template>