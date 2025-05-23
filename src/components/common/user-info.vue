<script lang="ts" setup>
import { useAuthStore } from '@/stores'
const authStore = useAuthStore()

const avatarUrl = computed(() => {
  return (
    authStore.userInfo?.avatar ||
    'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
  )
})
</script>

<template>
  <el-dropdown placement="top-start">
    <el-avatar :size="24" :src="avatarUrl" />
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item>下午好，{{ authStore.userInfo?.nickName }}</el-dropdown-item>
        <el-dropdown-item divided>退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>
