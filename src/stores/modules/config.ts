export const useConfigStore = defineStore('config', () => {
  const isCollapse = ref(false)
  const isFullscreen = ref(false)
  const theme = ref<'light' | 'dark'>('dark')
  const language = ref<'zh-cn' | 'en'>('zh-cn')

  const toggleIsCollapse = () => {
    isCollapse.value = !isCollapse.value
  }

  const setIsFullscreen = (value: boolean) => {
    isFullscreen.value = value
  }

  const setTheme = (value: 'light' | 'dark') => {
    theme.value = value
  }

  const setLanguage = (value: 'zh-cn' | 'en') => {
    language.value = value
  }

  return {
    isCollapse,
    toggleIsCollapse,
    isFullscreen,
    setIsFullscreen,
    theme,
    setTheme,
    language,
    setLanguage,
  }
})
