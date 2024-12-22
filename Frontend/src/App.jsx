import React from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import { Home } from './pages/Home/Home'
import { Package } from './pages/Packages/Package'
import { Navbar } from './components/NavFooter/Navbar'
import { Footer } from './components/NavFooter/Footer'
import { Explore } from './pages/Explore/Explore'
import Form from './pages/Form/Form'


export const App = () => {
  return (
      <BrowserRouter>
        <Navbar/>
           <Routes>
             <Route path='/' element={<Home/>} />
             <Route path='/form' element={<Form/>} />
             <Route path='/package' element={<Package/>} />
             <Route path='/explore' element={<Explore/>} />
           </Routes>
         <Footer/>  
      </BrowserRouter>
  )
}
