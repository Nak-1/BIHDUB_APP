"use client";

import ItemCard from "@/components/ItemCard";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import auctionData from "../../data/auctions.json";
import "../../styles/Auctions.css";
import io from 'socket.io-client';

let socket;

export default function Auctions() {
  const [activeTab, setActiveTab] = useState("all");
  const router = useRouter();
  const underlineRef = useRef(null);
  const tabsRef = useRef({});
  
  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  useEffect(() => {
    if (underlineRef.current && tabsRef.current[activeTab]) {
      const activeTabElement = tabsRef.current[activeTab];
      const { offsetLeft, offsetWidth } = activeTabElement;
      
      underlineRef.current.style.width = `${offsetWidth}px`;
      underlineRef.current.style.transform = `translateX(${offsetLeft}px)`;
    }
  }, [activeTab]);

  const navigateToItemInfo = (itemId) => {
    router.push("/itemInfo");
  };


  const [currentBid, setCurrentBid] = useState(0);
  const [myBid, setMyBid] = useState('');

  useEffect(() => {
    if (!socket) {
      fetch('/api/socket'); // Server-г эхлүүлнэ
      socket = io();

      socket.on('connect', () => {
        console.log('Socket connected');
      });

      socket.on('update_bid', (data) => {
        setCurrentBid(data);
      });
    }

    return () => {
      if (socket) {
        socket.disconnect();
        socket = null;
      }
    };
  }, []);

  const submitBid = () => {
    const bidAmount = parseInt(myBid, 10);
    if (bidAmount > currentBid) {
      socket.emit('new_bid', bidAmount);
      setMyBid('');
    } else {
      alert('Одоогийн үнээс өндөр үнэ оруулна уу');
    }
  };

  return (
    <main>
      <section className="contact-header">
        <h1>Дуудлага худалдаа</h1>
      </section>
      <section className="auction-header">
        <div className="tabs-container">
          <div className="auction-tabs">
            <button 
              className={`tab-btn ${activeTab === 'all' ? 'active' : ''}`}
              data-tab="all"
              onClick={() => handleTabClick('all')}
              ref={(el) => (tabsRef.current['all'] = el)}
            >
              Бүх бараа
            </button>
            <button 
              className={`tab-btn ${activeTab === 'upcoming' ? 'active' : ''}`}
              data-tab="upcoming"
              onClick={() => handleTabClick('upcoming')}
              ref={(el) => (tabsRef.current['upcoming'] = el)}
            >
              Удахгүй болох
            </button>
            <button 
              className={`tab-btn ${activeTab === 'ongoing' ? 'active' : ''}`}
              data-tab="ongoing"
              onClick={() => handleTabClick('ongoing')}
              ref={(el) => (tabsRef.current['ongoing'] = el)}
            >
              Яг одоо болж буй
            </button>
            <div className="tab-underline" ref={underlineRef}></div>
          </div>
        </div>
        
        <div className="filter-section">
          <label htmlFor="sort">Ангилах</label>
          <select id="sort">
            <option value="all">Үнэ буурах</option>
            <option value="low-high">Үнэ: Багаас их</option>
            <option value="high-low">Үнэ: Ихээс бага</option>
            <option value="newest">Шинэ бараа</option>
          </select>
        </div>
      </section>
      <section className="section2">
        <div className="section2-container">
          <div id="auctionContainer" className="auction-cards">
            {activeTab === 'all' && (
              <>
                {
                  auctionData.auctions.map((auction, index) => (
                    <ItemCard item={auction} key={index}/>
                  ))
                }
              </>
            )}
            
            {activeTab === 'upcoming' && (
              <>
                {
                  auctionData.auctions.map((auction, index) => (
                    <ItemCard item={auction} key={index}/>
                  ))
                }
              </>
            )}
            
            {activeTab === 'ongoing' && (
              <>
                {
                  auctionData.auctions.map((auction, index) => (
                    <ItemCard item={auction} key={index}/>
                  ))
                }
              </>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
