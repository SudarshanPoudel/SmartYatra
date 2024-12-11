import React from 'react'
import './Home.css'
import { Main } from '../../Components/HomeComp/Main'
import { Features } from '../../Components/HomeComp/Features'


export const Home = () => {

  return (
    <>
    <div className='section'>
      <Main/>
      <Features />
    </div>
      
    </>
  )
}