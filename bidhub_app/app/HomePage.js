"use client";

import ItemCard from "@/components/ItemCard";
import Image from "next/image";
import { useEffect, useState } from "react";
import section1 from "../assests/section1.png";
import "../styles/HomePage.css";

export default function HomePage() {
  const [auctions, setAuctions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function getProjects() {
    const response = await fetch('/api/bids');
    if (!response.ok) throw new Error('Failed to fetch projects');
    return response.json();
  }

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const data = await getProjects();
        setAuctions(data.auctions);
        console.log(data);
      } catch (error) {
        console.error('Error fetching projects:', error);
        setError('Failed to load auctions. Please try again later.');
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

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
            {loading ? (
              <p>Loading auctions...</p>
            ) : error ? (
              <p className="error-message">{error}</p>
            ) : auctions && auctions.length > 0 ? (
              auctions.map((auction, index) => (
                <ItemCard item={auction} key={index}/>
              ))
            ) : (
              <p>No auctions available at the moment.</p>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
