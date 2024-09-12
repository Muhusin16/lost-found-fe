'use client'
import { RootState } from '@/app/store/store';
import React from 'react'
import { useSelector } from 'react-redux';

const ClaimItem = () => {
    const { products, status } = useSelector((state:RootState) => state.products);

  return (<>
  <h1>Products</h1>
    <div>{products.map((title:any, specificLocation:any, dateLost:any) => (
        <div key={title}>
          <p>{title}</p>
          <p>{specificLocation}</p>
          <p>{dateLost}</p>
        </div>
      ))}</div></>
  )
}

export default ClaimItem