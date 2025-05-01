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
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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
    if (mounted) {
      const userLoggedIn = localStorage.getItem("isLoggedIn") === "true";
      setIsLoggedIn(userLoggedIn);
    }
  }, [mounted]);

  useEffect(() => {
    if (!mounted) return;
    
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [mounted]);

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
      <header className={scrolled ? "scrolled" : ""}>
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
            aria-label="Menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
          <div className={`nav-links ${menuOpen ? "active" : ""}`}>
            <Link href="/" onClick={() => setMenuOpen(false)}>Нүүр</Link>
            <Link href="/auctions" onClick={() => setMenuOpen(false)}>Дуудлага худалдаа</Link>
            <Link href="/buySell" onClick={() => setMenuOpen(false)}>Авах, зарах</Link>
            <Link href="/aboutUs" onClick={() => setMenuOpen(false)}>Бидний тухай</Link>
            <Link href="/contactUs" onClick={() => setMenuOpen(false)}>Холбогдох</Link>
            <Link href="/search" className="search-btn" onClick={() => setMenuOpen(false)} aria-label="Хайх">
              <span className="search-text">Хайх</span>
              <Image
                src={searchIcon}
                alt="Search Icon"
                width={16}
                height={16}
              />
            </Link>
            
            {mounted && (isLoggedIn ? (
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
                    <Link href="/profile" onClick={() => setProfileDropdownOpen(false)}>Профайл</Link>
                    <Link href="/settings" onClick={() => setProfileDropdownOpen(false)}>Тохиргоо</Link>
                    <button onClick={handleLogout}>Гарах</button>
                  </div>
                )}
              </div>
            ) : (
              <Link href="/auth" className="settings-btn" onClick={() => setMenuOpen(false)} aria-label="Нэвтрэх">Нэвтрэх</Link>
            ))}
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
