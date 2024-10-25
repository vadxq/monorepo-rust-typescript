// @refresh reload
import { mount, StartClient } from '@solidjs/start/client'
import { initVhCheck } from 'utils'

initVhCheck()

mount(() => <StartClient />, document.getElementById('app')!)
