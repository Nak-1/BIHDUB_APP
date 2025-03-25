"use client";

import Image from "next/image"; // Add this import
import "../styles/HomePage.css";

import item1 from "../assests/item1.png";
import item2 from "../assests/item2.png";
import item3 from "../assests/item3.png";
import section1 from "../assests/section1.png";

export default function HomePage() {
  return (
    <main>
      <section className="section1">
        <div className="section1-image">
          <Image 
            src={section1}
            alt="Auction Platform Preview" 
          />
        </div>
        <div className="section1-content">
          <h1>Үнэ цэнэ,<br/>Авах, зарах</h1>
          <p>Бид танд найдвартай дуудлага худалдаанд цахимаар оролцох болон өөрийн бараагаа дуудлага худалдаанд зарах
            боломжийг олгоно</p>
          <div className="section1-buttons">
            <button className="btn-primary">Дуудлага худалдаанд оролцох</button>
            <button className="btn-secondary">Дуудлага худалдаа үүсгэх</button>
          </div>
        </div>
      </section>
      <section className="section2">
        <div className="section2-content">
          <h1>Хамгийн сүүлийн дуудлага худалдаа</h1>
          <div id="auctionContainer" className="auction-cards">
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
                <button className="bid-button">Дуудлага өгөх</button>
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
          </div>
        </div>
      </section>
    </main>
  );
}
