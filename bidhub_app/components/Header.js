"use client"; 

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import "../styles/Header.css";

import logo from "../assests/logo.png";
import profileIcon from "../assests/profileIcon.png";
import searchIcon from "../assests/searchIcon.png";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = () => {
      if (profileDropdownOpen) {
        setProfileDropdownOpen(false);
      }
    };
    
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [profileDropdownOpen]);


  useEffect(() => {
    const userLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(userLoggedIn);
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    document.body.style.overflow = menuOpen ? "" : "hidden";
  };

  const toggleProfileDropdown = (e) => {
    e.stopPropagation();
    setProfileDropdownOpen(!profileDropdownOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    setProfileDropdownOpen(false);
    window.location.href = "/";
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
            
            {isLoggedIn ? (
              <div className="profile-container">
                <button 
                  className="profile-btn" 
                  onClick={toggleProfileDropdown}
                  aria-label="Профайл"
                >
                  <Image
                    src={profileIcon}
                    alt="Profile Icon"
                    width={40}
                    height={40}
                  />
                </button>
                
                {profileDropdownOpen && (
                  <div className="profile-dropdown" onClick={(e) => e.stopPropagation()}>
                    <Link href="/profile">Профайл</Link>
                    <Link href="/settings">Тохиргоо</Link>
                    <button onClick={handleLogout}>Гарах</button>
                  </div>
                )}
              </div>
            ) : (
              <Link href="/auth" className="settings-btn" aria-label="Нэвтрэх">Нэвтрэх</Link>
            )}
          </div>
        </nav>
      </header>
      {menuOpen && <div className="overlay active" onClick={toggleMenu}></div>}
      {profileDropdownOpen && (
        <div className="profile-overlay" onClick={() => setProfileDropdownOpen(false)}></div>
      )}
    </>
  );
}
