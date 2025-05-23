<script lang="ts" setup>
const LayoutAside = defineAsyncComponent(() => import('./layout-aside/index.vue'))
const LayoutHeader = defineAsyncComponent(() => import('./layout-header/index.vue'))
const LayoutMain = defineAsyncComponent(() => import('./layout-main/index.vue'))
</script>

<template>
  <el-container class="h-screen">
    <layout-aside />
    <el-container direction="vertical">
      <layout-header />
      <!-- <tabs /> -->
      <layout-main />
    </el-container>
  </el-container>
</template>
