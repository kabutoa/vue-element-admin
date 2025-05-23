<template>
  <el-header>
    <collapse />
    <breadcrumb />
    <div class="header-right">
      <fullscreen />
      <theme />
      <user-info />
    </div>
  </el-header>
</template>

<style lang="scss" scoped>
.el-header {
  @include mixins.flex-ac;
  gap: 12px;
  border-bottom: 1px solid var(--el-border-color);
}

.header-right {
  @include mixins.flex-ac;
  gap: 12px;
  margin-left: auto;
}
</style>
