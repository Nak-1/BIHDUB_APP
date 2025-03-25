"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

import "../../styles/Auctions.css";
import "../../styles/HomePage.css";

import item1 from "../../assests/item1.png";
import item2 from "../../assests/item2.png";
import item3 from "../../assests/item3.png";

export default function Auctions() {
  const [activeTab, setActiveTab] = useState("all");
  const router = useRouter();
  
  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  const navigateToItemInfo = (itemId) => {
    router.push("/itemInfo");
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
              className="tab-btn active" 
              data-tab="all"
              onClick={() => handleTabClick('all')}
            >
              Бүх бараа
            </button>
            <button 
              className="tab-btn" 
              data-tab="upcoming"
              onClick={() => handleTabClick('upcoming')}
            >
              Удахгүй болох
            </button>
            <button 
              className="tab-btn" 
              data-tab="ongoing"
              onClick={() => handleTabClick('ongoing')}
            >
              Яг одоо болж буй
            </button>
            <div className="tab-underline"></div>
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
        <div className="section2-content">
          <div id="auctionContainer" className="auction-cards">
            {activeTab === 'all' && (
              <>
                <div className="auction-card">
                  <Image 
                    src={item1}
                    alt="Auction Item 1" 
                    className="auction-image"
                  />
                  <div className="auction-details">
                    <h3 className="auction-title">Бүтээгдэхүүн 1</h3>
                    <div className="auction-price">₮ 250,000</div>
                    <div className="auction-time">Дуусах хугацаа: 2 цаг</div>
                    <button className="bid-button" onClick={() => navigateToItemInfo('item1')}>Дуудлага өгөх</button>
                  </div>
                </div>
                
                <div className="auction-card">
                  <Image
                    src={item2}
                    alt="Auction Item 2" 
                    className="auction-image"
                  />
                  <div className="auction-details">
                    <h3 className="auction-title">Бүтээгдэхүүн 2</h3>
                    <div className="auction-price">₮ 180,000</div>
                    <div className="auction-time">Дуусах хугацаа: 5 цаг</div>
                    <button className="bid-button">Дуудлага өгөх</button>
                  </div>
                </div>
                
                <div className="auction-card">
                  <Image
                    src={item3}
                    alt="Auction Item 3" 
                    className="auction-image"
                  />
                  <div className="auction-details">
                    <h3 className="auction-title">Бүтээгдэхүүн 3</h3>
                    <div className="auction-price">₮ 320,000</div>
                    <div className="auction-time">Дуусах хугацаа: 1 өдөр</div>
                    <button className="bid-button">Дуудлага өгөх</button>
                  </div>
                </div>
              </>
            )}
            
            {activeTab === 'upcoming' && (
              <>
                <div className="auction-card">
                  <Image
                    src={item2}
                    alt="Upcoming Auction Item" 
                    className="auction-image"
                  />
                  <div className="auction-details">
                    <h3 className="auction-title">Удахгүй болох дуудлага</h3>
                    <div className="auction-price">₮ 420,000</div>
                    <div className="auction-time">Эхлэх хугацаа: 2 өдөр</div>
                    <button className="bid-button">Сануулга тохируулах</button>
                  </div>
                </div>
              </>
            )}
            
            {activeTab === 'ongoing' && (
              <>
                <div className="auction-card">
                  <Image
                    src={item3}
                    alt="Ongoing Auction Item" 
                    className="auction-image"
                  />
                  <div className="auction-details">
                    <h3 className="auction-title">Яг одоо болж буй</h3>
                    <div className="auction-price">₮ 350,000</div>
                    <div className="auction-time">Дуусах хугацаа: 30 минут</div>
                    <button className="bid-button">Дуудлага өгөх</button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
