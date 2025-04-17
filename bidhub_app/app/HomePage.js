"use client";

import ItemCard from "@/components/ItemCard";
import Image from "next/image";
import section1 from "../assests/section1.png";
import auctionData from "../data/auctions.json";
import "../styles/HomePage.css";

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
            {
              auctionData.auctions.map((auction, index) => (
                <ItemCard item={auction} key={index}/>
              ))
            }
          </div>
        </div>
      </section>
    </main>
  );
}
