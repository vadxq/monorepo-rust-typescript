declare module 'crypto-js'

declare global {
  interface Window {
    WVJBCallbacks: any
    WebViewJavascriptBridge: any
    setupWebViewJavascriptBridge: any
    webkit: any
    global: any
  }
}

export interface CustomWindow extends Window {
  WVJBCallbacks: any
  WebViewJavascriptBridge: any
  setupWebViewJavascriptBridge: any
}

declare let window: CustomWindow
