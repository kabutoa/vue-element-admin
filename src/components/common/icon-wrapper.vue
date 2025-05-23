<script lang="ts" setup>
import * as ElementPlusIcons from '@element-plus/icons-vue'

withDefaults(
  defineProps<{
    content: string
    placement?:
      | 'top-start'
      | 'top-end'
      | 'bottom-start'
      | 'bottom-end'
      | 'left-start'
      | 'left-end'
      | 'right-start'
      | 'right-end'
      | 'top'
      | 'bottom'
      | 'left'
      | 'right'
    iconName: keyof typeof ElementPlusIcons
    size?: number
    color?: string
  }>(),
  {
    size: 20,
    color: 'var(--el-text-color-primary)',
    placement: 'bottom',
  },
)

const emit = defineEmits<{
  (e: 'click'): void
}>()
</script>

<template>
  <el-tooltip effect="dark" :content="content" :placement="placement">
    <el-icon :size="size" :color="color" @click="emit('click')">
      <component :is="iconName" />
    </el-icon>
  </el-tooltip>
</template>

<style lang="scss" scoped>
.el-icon {
  cursor: pointer;
}
</style>
