"use client"; 

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import "../styles/Header.css";

import logo from "../assests/logo.png";
import searchIcon from "../assests/searchIcon.png";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    document.body.style.overflow = menuOpen ? "" : "hidden";
  };

  return (
    <>
      <header>
        <nav className="navbar">
          <div className="logo">
            <Link href="/">
              <Image 
                src={logo} 
                alt="BidHub Logo"
                width={50}
                height={50}
                priority
              />
            </Link>
          </div>
          <button
            className={`hamburger ${menuOpen ? "active" : ""}`} 
            onClick={toggleMenu}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
          <div className={`nav-links ${menuOpen ? "active" : ""}`}>
            <Link href="/">Нүүр</Link>
            <Link href="/auctions">Дуудлага худалдаа</Link>
            <Link href="/buySell">Авах, зарах</Link>
            <Link href="/aboutUs">Бидний тухай</Link>
            <Link href="/contactUs">Холбогдох</Link>
            <button className="search-btn" aria-label="Хайх">
              <Image
                src={searchIcon}
                alt="Search Icon"
                width={16}
                height={16}
              />
            </button>
            <Link href="/auth" className="settings-btn" aria-label="Нэвтрэх">Нэвтрэх</Link>
          </div>
        </nav>
      </header>
      {menuOpen && <div className="overlay active" onClick={toggleMenu}></div>}
    </>
  );
}
