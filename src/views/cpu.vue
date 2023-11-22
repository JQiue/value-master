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
import pcCPU from '../data/pc-cpu.json';
const columns = [
  {
    colKey: "model", title: "型号",
  }, {
    colKey: "socket", title: "接口",
  },
  {
    colKey: "cores", title: "核心",
  },
  {
    colKey: "threads", title: "线程",
  },
  {
    colKey: "process", title: "制程",
  },
  {
    colKey: "clockspeed", title: "频率",
  },
  {
    colKey: "turbospeed", title: "睿频", desc: "2323"
  },
  {
    colKey: "storage", title: "缓存",
  },
  {
    colKey: "tdp", title: "TDP",
  },
  {
    colKey: "graphics", title: "核显"
  },
  {
    colKey: "memory-type", title: "内存类型"
  },
  {
    colKey: "memory-channels", title: "内存通道"
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
  data.value = pcCPU.map((item, index) => {
    return {
      ...item, index
    }
  });
})
</script>

<style scoped></style>