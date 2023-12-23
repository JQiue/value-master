<template>
  <div>
    <t-base-table :columns="columns" :data="data" rowKey="index" hover bordered>
      <template #price-performance-ratio="{ col, row }">
        <!-- {{ calcPricePerformance(row) }} -->
      </template>
    </t-base-table>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import pcGPU from '../data/pc-gpu.json';
const columns = [
  {
    colKey: "model", title: "型号",
  }, {
    colKey: "cuda", title: "流处理器",
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
    colKey: "memory-size", title: "显存大小(MB)"
  },
  {
    colKey: "memory-type", title: "显存类型"
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

onMounted(() => {
  data.value = pcGPU.map((item, index) => {
    return {
      ...item, index
    }
  });
})
</script>

<style scoped></style>