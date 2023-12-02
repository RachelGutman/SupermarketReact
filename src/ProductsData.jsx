import React from 'react'
import { useSelector } from 'react-redux'

export default function ProductData() {
  const { purches } = useSelector((store) => store)

  return (
    <>
      total amount products: {purches.length}
    </>

  )
}
