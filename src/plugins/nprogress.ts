import 'nprogress/nprogress.css'
import NProgress from 'nprogress'

NProgress.configure({
  easing: 'ease',
  speed: 300,
  showSpinner: false,
  trickleSpeed: 200,
  minimum: 0.3,
  parent: 'body',
})

export function install() {
  window.NProgress = NProgress
}
