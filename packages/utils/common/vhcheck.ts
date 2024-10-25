export const vhCheck = () => {
  // 模拟 vh
  const vh = window.innerHeight * 0.01
  // 设置 css 自定义属性
  document.documentElement.style.setProperty('--vh', `${vh}px`)
  console.log('vh', vh)
}

// 主要是有些国产浏览器，100vh不等于100%
export const initVhCheck = () => {
  vhCheck()
  document.addEventListener('DOMContentLoaded', () => {
    vhCheck()
  })
  window.addEventListener('resize', () => {
    vhCheck()
  })
}

/**
 * how to use
 * import { initVhCheck } from '@/utils/common/vhcheck'
 * initVhCheck()
 *
 * 100vh variable
 * --vh: 1vh
 * calc(100 * var(--vh, 1vh))
 */
