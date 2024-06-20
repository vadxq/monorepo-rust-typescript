import { A } from '@solidjs/router'

export default function Home() {
  return (
    <main class='mx-auto text-center text-gray-700'>
      <div>home</div>
      <A href='/about' class='text-sky-600 hover:underline'>
        Home
      </A>
    </main>
  )
}
