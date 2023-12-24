<script setup lang="ts">
import Nav from './components/Nav.vue';
import ReloadPrompt from './components/ReloadPrompt.vue';
</script>

<template>
  <Nav></Nav>
  <router-view></router-view>
  <ReloadPrompt></ReloadPrompt>
</template>

<style scoped></style>
