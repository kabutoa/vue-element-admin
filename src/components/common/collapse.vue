<script lang="ts" setup>
import { useConfigStore } from '@/stores'

const configStore = useConfigStore()

const onClick = () => {
  configStore.toggleIsCollapse()
}
</script>

<template>
  <icon-wrapper
    :content="configStore.isCollapse ? '展开' : '折叠'"
    :icon-name="configStore.isCollapse ? 'Expand' : 'Fold'"
    :size="22"
    @click="onClick"
  />
</template>

<style lang="scss" scoped></style>
