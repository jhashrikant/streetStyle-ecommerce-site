import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

const MyAccount = () => {

    const router = useRouter()

    useEffect(() => {
        if (!localStorage.getItem('authToken')){
            router.push(process.env.HOST)
        }
    }, [])
    



  return (
    <div>MyAccount</div>
  )
}

export default MyAccount