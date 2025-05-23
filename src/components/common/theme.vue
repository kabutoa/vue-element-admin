<script lang="ts" setup>
import { useConfigStore } from '@/stores'

const configStore = useConfigStore()
</script>

<template>
  <el-tooltip
    effect="dark"
    :content="configStore.theme === 'dark' ? '切换到亮色主题' : '切换到暗色主题'"
  >
    <el-switch
      v-model="configStore.theme"
      class="mt-2"
      style="margin-left: 24px"
      inline-prompt
      active-icon="Moon"
      inactive-icon="Sunny"
      active-value="dark"
      inactive-value="light"
    />
  </el-tooltip>
</template>

<style lang="scss" scoped>
.el-switch {
  margin-left: 0 !important;
}
</style>
