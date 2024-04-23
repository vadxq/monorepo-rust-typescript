export const vhCheck = () => {
  // 模拟 vh
  const vh = window.innerHeight * 0.01
  // 设置 css 自定义属性
  document.documentElement.style.setProperty('--vh', `${vh}px`)
  console.log('vh', vh)
}
