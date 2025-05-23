<script lang="ts" setup>
const { isFullscreen, toggle } = useFullscreen()
</script>

<template>
  <icon-wrapper
    ref="iconWrapperRef"
    :content="isFullscreen ? '退出全屏' : '全屏'"
    icon-name="FullScreen"
    @click="toggle"
  />
</template>
