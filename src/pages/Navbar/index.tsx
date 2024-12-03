'use client';
import React from 'react';
import './index.scss';
import styles from './Navbar.module.css';


const Navbar = () => {
    return (
      <nav className={styles.navbar}>
        <h1>Filmes</h1>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/">Sobre</a></li>
        </ul>
      </nav>
    );
  };
  
  export default Navbar;