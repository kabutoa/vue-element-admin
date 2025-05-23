<script setup lang="ts">
const handleClick = () => {
  ElNotification('test')
}
</script>

<template>
  <div>
    <el-button @click="handleClick">Test</el-button>
  </div>
</template>
