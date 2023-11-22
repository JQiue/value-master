<template>
  <div>
    <t-base-table :columns="columns" rowKey="index">
      <template #price-performance-ratio="{ col, row }">
        <!-- {{ calcPricePerformance(row) }} -->
      </template>
    </t-base-table>
  </div>
</template>

<script setup lang="ts">
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
</script>

<style scoped></style>