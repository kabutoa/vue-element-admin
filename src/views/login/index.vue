<script lang="ts" setup>
import { type FormInstance, type FormRules } from 'element-plus'
import { User, Lock } from '@element-plus/icons-vue'
import { useAuthStore } from '@/stores'

const router = useRouter()
const authStore = useAuthStore()

const formRef = ref<FormInstance>()
const form = ref<Auth.TLoginParams>({
  username: 'admin',
  password: '123456',
})

const loading = ref(false)

const rules = ref<FormRules<Auth.TLoginParams>>({
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 12, message: '用户名长度应为3到5位', trigger: 'blur' },
  ],
  password: [
    {
      required: true,
      message: '请输入密码',
      trigger: 'blur',
    },
    { min: 6, max: 12, message: '密码长度应为6到12位', trigger: 'blur' },
  ],
})

const onLogin = async () => {
  try {
    loading.value = true
    await authStore.login({
      username: form.value.username,
      password: form.value.password,
    })
    ElNotification.success('登录成功')
    await router.replace({
      path: (router.currentRoute.value.query?.redirect as string) || '/',
    })
  } finally {
    loading.value = false
  }
}

const submitForm = async () => {
  if (!formRef.value) return
  const valid = await formRef.value.validate()
  valid && onLogin()
}

const resetForm = () => {
  if (!formRef.value) return
  formRef.value.resetFields()
}
</script>

<template>
  <el-row class="login">
    <el-col :xs="0" :sm="12" :md="16" class="login-bg">
      <div class="login-banner">
        <h1>Slerf Admin</h1>
        <p>一个现代化的后台管理系统</p>
      </div>
    </el-col>
    <el-col :xs="24" :sm="12" :md="8" class="login-form">
      <div class="login-form-wrapper">
        <h2>欢迎使用</h2>
        <el-divider> 👏 </el-divider>
        <el-form ref="formRef" :model="form" :rules="rules" label-position="top">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="form.username" placeholder="请输入用户名">
              <template #prefix>
                <el-icon><User /></el-icon>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item label="密码" prop="pwd">
            <el-input
              v-model="form.password"
              type="password"
              placeholder="请输入密码"
              show-password
            >
              <template #prefix>
                <el-icon><Lock /></el-icon>
              </template>
            </el-input>
          </el-form-item>
          <div class="login-form-actions">
            <el-checkbox>记住我</el-checkbox>
            <span>忘记密码</span>
          </div>
          <div class="login-form-buttons">
            <el-button :loading="loading" type="primary" @click="submitForm">登录</el-button>
            <el-button @click="resetForm">重置</el-button>
          </div>
        </el-form>
      </div>
    </el-col>
  </el-row>
</template>

<style lang="scss" scoped>
.login {
  position: relative;
  width: 100%;
  height: 100%;

  &-bg {
    @include mixins.flex-cc;
    background: linear-gradient(
      135deg,
      var(--el-color-primary) 0%,
      var(--el-color-primary-light-3) 100%
    );
  }

  &-banner {
    color: #fff;
    text-align: center;

    > h1 {
      font-size: 48px;
      font-weight: 700;
    }

    > p {
      font-size: 18px;
    }
  }

  &-form {
    @include mixins.flex-cc;

    &-wrapper {
      width: 80%;
      max-width: 400px;
      padding: 20px 0;

      > h2 {
        font-size: 28px;
        color: var(--el-color-primary);
        font-weight: 600;
        text-align: center;
      }
    }

    &-actions {
      @include mixins.flex-ac;
      justify-content: space-between;
      padding: 0 2px;

      > span {
        color: var(--el-color-primary);
        cursor: pointer;
        font-size: 14px;
        transition: color 0.2s;

        &:hover {
          color: var(--el-color-primary-light-3);
          text-decoration: underline;
        }
      }
    }

    &-buttons {
      @include mixins.flex-ac;
      padding-top: 18px;
    }
  }
}
</style>
