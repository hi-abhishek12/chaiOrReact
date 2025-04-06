import { useState } from 'react'

import './App.css'

function App() {
  const [count, setCount] = useState(0)
  console.log("HELLO",import.meta.env.VITE_APP_APPWRITE_URL)
  return (
    <>
      <h1>appwrite mega blog</h1>
    </>
  )
}

export default App
