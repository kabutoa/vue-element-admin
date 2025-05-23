<script lang="ts" setup>
import type { RouteRecordRaw } from 'vue-router'

const props = defineProps<{
  menu: RouteRecordRaw
}>()

const { menu } = toRefs(props)
</script>

<template>
  <template v-if="menu.children?.length">
    <el-sub-menu :index="menu.path" :key="menu.path">
      <template #title>
        <el-icon v-if="menu.meta?.icon">
          <component :is="menu.meta.icon" />
        </el-icon>
        <span>{{ menu.meta?.title }}</span>
      </template>
      <sub-menu v-for="child in menu.children" :key="child.path" :menu="child" />
    </el-sub-menu>
  </template>
  <el-menu-item v-else :index="menu.path">
    <el-icon v-if="menu.meta?.icon">
      <component :is="menu.meta.icon" />
    </el-icon>
    <template #title>
      {{ menu.meta?.title }}
    </template>
  </el-menu-item>
</template>

<style lang="scss" scoped></style>
