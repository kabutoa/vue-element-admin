<script lang="ts" setup></script>

<template>
  <el-main>
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </transition>
    </router-view>
  </el-main>
</template>

<style lang="scss" scoped>
.el-main {
  padding: 10px;
}
</style>
