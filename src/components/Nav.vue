<template>
  <div>
    <t-head-menu v-model="menuValue" theme="light" @change="changeHandler">
      <t-menu-item value="mobile"> 手机 </t-menu-item>
      <t-menu-item value="cpu"> 台式处理器 </t-menu-item>
      <t-menu-item value="gpu" disabled> 台式显卡 </t-menu-item>
      <template #operations>
        <t-link href="https://github.com/JQiue/value-master" hover="" target="_blank">
          <t-button variant="text" shape="square">
            <template #icon><t-icon name="logo-github" /></template>
          </t-button>
        </t-link>
      </template>
    </t-head-menu>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const router = useRouter();
const route = useRoute();

const menuValue = ref('mobile');

const changeHandler = (active: any) => {
  menuValue.value = active;
  router.push(active);
};

onMounted(() => {
  menuValue.value = useRoute().name?.toString() || menuValue.value;
})
</script>

<style scoped></style>