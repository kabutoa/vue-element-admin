<script lang="ts" setup>
import { useConfigStore, useAuthStore } from '@/stores'
const SubMenu = defineAsyncComponent(() => import('./sub-menu.vue'))

const configStore = useConfigStore()
const authStore = useAuthStore()
</script>

<template>
  <div class="aside-menu">
    <el-scrollbar>
      <el-menu router :default-active="$route.path" :collapse="configStore.isCollapse">
        <sub-menu v-for="menu in authStore.menus" :key="menu.path" :menu="menu" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<style lang="scss" scoped>
.aside-menu {
  height: calc(100vh - var(--header-height));
}
</style>
