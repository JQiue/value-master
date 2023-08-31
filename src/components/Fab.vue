<script lang="ts" setup>
const props = defineProps<{ text?: string, click?: Function }>()
</script>

<template>
  <div class="fab">
    <t-button @click="props.click" shape="circle">
      <slot></slot>
    </t-button>
  </div>
</template >

<style>
.fab {
  position: fixed;
  right: 24px;
  bottom: 36px;
}
</style>
  