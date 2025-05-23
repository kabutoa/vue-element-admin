<script lang="ts" setup>
import { useConfigStore } from '@/stores'

const Logo = defineAsyncComponent(() => import('./logo.vue'))
const AsideMenu = defineAsyncComponent(() => import('./aside-menu.vue'))

const configStore = useConfigStore()
</script>
<template>
  <el-aside :class="['layout-aside', { 'layout-aside--collapse': configStore.isCollapse }]">
    <logo />
    <aside-menu />
  </el-aside>
</template>

<style lang="scss" scoped>
.layout-aside {
  width: var(--aside-width);
  border-right: 1px solid var(--el-border-color);
  transition: width 0.3s;

  &--collapse {
    width: var(--aside-width-collapse);
  }
}
</style>
