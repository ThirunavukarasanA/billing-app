import {React, useEffect} from 'react'

export default function Home() {
  useEffect(()=>{
    localStorage.clear();
  },[])
  return (
    <div>
        <h1>Click Here For <a href='/login'>Login</a></h1>
    </div>
  )
}
