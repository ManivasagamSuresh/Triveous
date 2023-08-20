import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import { addDoc, collection, doc, getDoc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import db from './firebase';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/login';
import Signup from './components/Register';
import ViewNews from './components/ViewNews';
import HomeMain from './components/HomeMain';
import Wishlist from './components/Wishlist';




function App() {
 
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/home' element={<HomeMain/>}/>
      <Route path='/viewnews' element={<ViewNews/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/wishlist' element={<Wishlist/>}/>
      </Routes>
      </BrowserRouter>
     
    </div>
  );
}

export default App;
