import { ColorModeProvider, ColorModeScript, cookieStorageManagerSSR } from '@kobalte/core'
import { Meta, MetaProvider, Title } from '@solidjs/meta'
import { Router } from '@solidjs/router'
import { FileRoutes } from '@solidjs/start/router'
import { Suspense } from 'solid-js'
import { isServer } from 'solid-js/web'
import { getCookie } from 'vinxi/server'

import { GlobalProvider } from '~/stores'

import '~/styles/app.css'
import AnalyticsScript from '~/components/AnalyticsScript'

function getServerCookies() {
  'use server'
  const colorMode = getCookie('kb-color-mode')
  return colorMode ? `kb-color-mode=${colorMode}` : ''
}

export default function App() {
  const storageManager = cookieStorageManagerSSR(
    isServer ? getServerCookies() : document.cookie,
  )

  return (
    <Router
      root={props => (
        <GlobalProvider>
          <MetaProvider>
            <Title>清竹茶馆-vadxq</Title>
            <Meta name='description' content='清竹茶馆,vadxq' />
            <Meta name='keywords' content='清竹茶馆,vadxq' />
            <Meta name='application-name' content='清竹茶馆-vadxq' />
            <Meta name='referrer' content='origin-when-cross-origin' />
            <Meta name='format-detection' content='telephone=no' />
            <Meta name='apple-mobile-web-app-capable' content='yes' />
            <Meta name='apple-mobile-web-app-title' content='清竹茶馆-vadxq' />
            <Meta property='og:type' content='website' />
            <Meta property='og:title' content='清竹茶馆-vadxq' />
            <Meta property='og:url' content='https://blog.vadxq.com' />
            <Meta property='og:site_name' content='vadxq' />
            <Meta
              property='og:description'
              content='清竹茶馆-vadxq'
            />
            <Meta property='og:locale' content='zh_CN' />
            <Meta property='og:image' content='https://qnimg.vadxq.com/blog/2017/logo.jpg' />
            <Meta property='article:author' content='vadxq' />
            <Meta property='article:tag' content='vadxq' />
            <Meta property='twitter:card' content='summary' />
            <Meta
              property='twitter:image:src'
              content='https://qnimg.vadxq.com/blog/2017/logo.jpg'
            />
            <Meta
              name='msapplication-TileImage'
              content='https://qnimg.vadxq.com/blog/2017/logo.jpg'
            />

            <ColorModeScript storageType={storageManager.type} />
            <ColorModeProvider storageManager={storageManager}>
              <>
                <Suspense>{props.children}</Suspense>
                {/* add Analytics Script */}
                <AnalyticsScript gaId='G-XS761Z9MSM' clarityId='murr9zpsfi' />
              </>
            </ColorModeProvider>
          </MetaProvider>
        </GlobalProvider>
      )}
    >
      <FileRoutes />
    </Router>
  )
}
