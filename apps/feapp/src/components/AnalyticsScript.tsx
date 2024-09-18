import { onMount } from 'solid-js'

export default function AnalyticsScript({ gaId, clarityId }: any) {
  onMount(() => {
    // 添加谷歌统计脚本
    const script = document.createElement('script')
    script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`
    script.async = true
    document.head.appendChild(script) // 使用类型断言来告诉 TypeScript window 对象有 dataLayer 属性
    ;(window as any).dataLayer = (window as any).dataLayer || []
    // eslint-disable-next-line no-unused-vars
    function gtag(_p0?: string, _p1?: any) {
      ;(window as any).dataLayer.push(arguments)
    }
    gtag('js', new Date())
    gtag('config', gaId)

    const script2 = document.createElement('script')
    script2.innerHTML = `(function(c,l,a,r,i,t,y){
      c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
      t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
      y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
  })(window, document, "clarity", "script", "${clarityId}");`
    script2.type = 'text/javascript'
    document.head.appendChild(script2)
  })

  return null // 返回null，因为这个组件不渲染任何DOM元素
}
