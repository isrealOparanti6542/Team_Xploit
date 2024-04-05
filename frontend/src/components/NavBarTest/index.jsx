import React from 'react'
import "../../sass/navbar.scss";
import { useState } from 'react';

export default function NavBarTest() {
 
  return (
    <header className='header'>
       <img src="../../../Logo.svg" alt="" className='logo' />
  <div className='flex'>
     <input type="text" placeholder="Explore" className='header__input'/>
     <nav>
      <ul className='header__list'><li className='header__list__item'><button>Home</button></li>
      <li className='header__list__item'> <button>Opportunities</button></li>
      <li className='header__list__item'> <button>Learn</button></li>
      <li className='header__list__item ' id='header__list__item__case'> <button>Get In Touch</button></li> </ul>
     </nav>
  </div>
    <div className='connect'> <button><img src="../../../github-removebg-preview.jpeg
    " alt="github connect" className='connect__github' /></button>
     <button className='connect__web3'>Connect Web3</button>
     </div>
    </header>
  )
}
