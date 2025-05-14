"use client";

import ItemCard from "@/components/ItemCard";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import io from 'socket.io-client';
import "../../styles/Auctions.css";

let socket;

export default function Auctions() {
  const [activeTab, setActiveTab] = useState("all");
  const [auctions, setAuctions] = useState([]);
  const [filteredAuctions, setFilteredAuctions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortOption, setSortOption] = useState("all");
  const router = useRouter();
  const underlineRef = useRef(null);
  const tabsRef = useRef({});
  
  useEffect(() => {
    async function fetchAuctions() {
      try {
        setLoading(true);
        const response = await fetch('/api/bids');
        
        if (!response.ok) {
          throw new Error('Failed to fetch auctions');
        }
        
        const data = await response.json();
        
        if (!data.auctions || !Array.isArray(data.auctions)) {
          console.error('Unexpected data structure:', data);
          throw new Error('Invalid data format');
        }
        
        setAuctions(data.auctions);
      } catch (err) {
        console.error('Error fetching auctions:', err);
        setError(err.message || 'Failed to load auctions');
      } finally {
        setLoading(false);
      }
    }
    
    fetchAuctions();
  }, []);
  
  useEffect(() => {
    if (!auctions || auctions.length === 0) {
      setFilteredAuctions([]);
      return;
    }
    
    const now = new Date();
    let filtered = [...auctions];
    
    if (activeTab === 'upcoming') {
      filtered = filtered.filter(auction => new Date(auction.startDate) > now);
    } else if (activeTab === 'ongoing') {
      filtered = filtered.filter(auction => 
        new Date(auction.startDate) <= now && new Date(auction.endDate) >= now
      );
    }
    
    switch (sortOption) {
      case 'low-high':
        filtered.sort((a, b) => (a.price || a.startingPrice) - (b.price || b.startingPrice));
        break;
      case 'high-low':
        filtered.sort((a, b) => (b.price || b.startingPrice) - (a.price || a.startingPrice));
        break;
      case 'newest':
        filtered.sort((a, b) => new Date(b.startDate) - new Date(a.startDate));
        break;
      default:
        filtered.sort((a, b) => (b.price || b.startingPrice) - (a.price || a.startingPrice));
        break;
    }
    
    setFilteredAuctions(filtered);
  }, [auctions, activeTab, sortOption]);
  
  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };
  
  const handleSortChange = (e) => {
    setSortOption(e.target.value);
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

  if (loading) {
    return (
      <main>
        <section className="contact-header">
          <h1>Дуудлага худалдаа</h1>
        </section>
        <div className="loading-container">
          <p>Дуудлага худалдааны мэдээлэл ачаалж байна...</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main>
        <section className="contact-header">
          <h1>Дуудлага худалдаа</h1>
        </section>
        <div className="error-container">
          <p>Алдаа гарлаа: {error}</p>
          <button onClick={() => window.location.reload()}>Дахин оролдох</button>
        </div>
      </main>
    );
  }

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
          <select 
            id="sort" 
            value={sortOption} 
            onChange={handleSortChange}
          >
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
            {filteredAuctions.length > 0 ? (
              filteredAuctions.map((auction, index) => (
                <ItemCard item={auction} key={index}/>
              ))
            ) : (
              <p className="no-auctions-message">
                {activeTab === 'all' 
                  ? 'Одоогоор дуудлага худалдаа байхгүй байна.' 
                  : activeTab === 'upcoming' 
                    ? 'Удахгүй болох дуудлага худалдаа байхгүй байна.' 
                    : 'Яг одоо болж буй дуудлага худалдаа байхгүй байна.'}
              </p>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
