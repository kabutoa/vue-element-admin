<script lang="ts" setup>
import { useConfigStore } from '@/stores'

const configStore = useConfigStore()
</script>

<template>
  <div :class="['logo', { 'logo--collapse': configStore.isCollapse }]">
    <h1 class="logo-title">Slerf Admin</h1>
    <img class="logo-img" src="@/assets/images/logo.png" alt="logo" />
  </div>
</template>

<style lang="scss" scoped>
.logo {
  @include mixins.flex-cc;
  height: var(--header-height);
  overflow: hidden;

  &-title {
    margin-right: 8px;
    font-size: 18px;
    font-weight: 600;
    color: var(--el-color-primary);
    @include mixins.text-ellipsis;
    transition: all 0.3s;
  }

  &-img {
    width: 32px;
    height: 32px;
    object-fit: contain;
    transition: all 0.3s;
  }

  &--collapse {
    .logo-title {
      margin-right: 0;
      width: 0;
      opacity: 0;
    }

    .logo-img {
      width: 36px;
      height: 36px;
    }
  }
}
</style>
