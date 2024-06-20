import { A } from '@solidjs/router'

export default function NotFound() {
  return (
    <main class='mx-auto p-4 text-center text-gray-700'>
      <h1 class='my-16 text-6xl font-thin uppercase text-sky-700'>Not Found</h1>
      <p class='my-4'>
        <A href='/' class='text-sky-600 hover:underline'>
          Home
        </A>
      </p>
    </main>
  )
}
