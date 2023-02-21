import React from 'react'
import { useRouter } from 'next/router'
import { LocalStorage } from "services/localStorage"

export const WithAuth = (WrappedComponent) =>  {
  const ComponentWithExtraInfo = (Props) => {
    const router = useRouter()
    if (typeof window !== 'undefined') {
      if (!LocalStorage.getItem()) router.replace('/login')
    }

    // @ts-ignore
    return <WrappedComponent {...Props} />
  }

  return ComponentWithExtraInfo
}
