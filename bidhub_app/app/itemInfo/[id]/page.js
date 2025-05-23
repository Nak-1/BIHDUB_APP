"use client";

import BidForm from "@/components/BidForm";
import ItemCard from "@/components/ItemCard";
import { socket } from '@/socket'; // Import the socket
import "@/styles/HomePage.css";
import "@/styles/ItemInfo.css";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ItemInfos() {
  const params = useParams();
  const router = useRouter();
  const itemId = params.id;
  
  const [item, setItem] = useState(null);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [relatedAuctions, setRelatedAuctions] = useState([]);
  const [isAuctionActive, setIsAuctionActive] = useState(true);
  const [bidHistory, setBidHistory] = useState([]);
  
  useEffect(() => {
    async function fetchItemData() {
      try {
        setLoading(true);
        const response = await fetch(`/api/bids/${itemId}`);

        if (!response.ok) {
          throw new Error('Failed to fetch item details');
        }
        
        const data = await response.json();
        setItem(data);
        
        if (data.bidHistory && Array.isArray(data.bidHistory)) {
          setBidHistory(data.bidHistory);
        }
        
        if (data.endDate) {
          const endDateTime = new Date(data.endDate);
          const currentTime = new Date();
          const timeDiff = endDateTime - currentTime;
          
          if (timeDiff > 0) {
            const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
            
            setTimeLeft({ days, hours, minutes, seconds });
            setIsAuctionActive(true);
          } else {
            setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
            setIsAuctionActive(false);
          }
        }
      } catch (err) {
        setError('Failed to load item details. Please try again later.');
      } finally {
        setLoading(false);
      }
    }
    
    async function fetchRelatedAuctions() {
      try {
        const response = await fetch('/api/bids');
        if (!response.ok) throw new Error('Failed to fetch related auctions');
        
        const data = await response.json();
        
        if (!data.auctions || !Array.isArray(data.auctions)) {
          console.error("Unexpected data structure:", data);
          setRelatedAuctions([]);
          return;
        }
        
        const otherAuctions = data.auctions.filter(auction => auction.id !== parseInt(itemId));
        
        setRelatedAuctions(otherAuctions);
      } catch (err) {
        console.error('Error fetching related auctions:', err);
        setRelatedAuctions([]);
      }
    }    
    
    if (itemId) {
      fetchItemData();
      fetchRelatedAuctions();
    }
  }, [itemId]);
  
  useEffect(() => {
    socket.emit("join_auction", itemId);
    
    socket.on("bid_update", (bidData) => {
      if (bidData.auctionId === itemId) {
        if (item) {
          setItem(prevItem => ({
            ...prevItem,
            price: bidData.amount
          }));
        }
        
        const newBid = {
          userId: bidData.userId,
          amount: bidData.amount,
          timestamp: bidData.timestamp || new Date().toISOString()
        };
        
        setBidHistory(prevHistory => [newBid, ...prevHistory]);
      }
    });
    
    return () => {
      socket.off("bid_update");
    };
  }, [itemId, item]);
  
  useEffect(() => {
    const timer = setInterval(() => {
      if (item && item.endDate) {
        const endDateTime = new Date(item.endDate);
        const currentTime = new Date();
        const timeDiff = endDateTime - currentTime;
        
        if (timeDiff > 0) {
          const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
          const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
          
          setTimeLeft({ days, hours, minutes, seconds });
        } else {
          setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
          setIsAuctionActive(false);
          clearInterval(timer);
        }
      }
    }, 1000);
    
    return () => clearInterval(timer);
  }, [item]);
  

  if (loading) return <div className="container">Loading item details...</div>;
  if (error) return <div className="container error-message">{error}</div>;
  if (!item) return <div className="container">Item not found</div>;

  return (
    <main>
      <section className="contact-header">
        <h1>Авах / зарах</h1>
      </section>
      <section>
        <div className="container">
          <div className="auction">
            <div className="image-section">
              <Image 
                src={item.image} 
                alt={item.title || "Auction item"} 
                width={400} 
                height={300}
              />
            </div>

            <div className="details">
              <h1>{item.title}</h1>
              <p className="author">by <i>{item.author || "Unknown Artist"}</i></p>
              <p className="price">Одоогийн үнэ: <strong>{item.price}₮</strong></p>
              <div className="countdown">
                <div className="time-box"><span>{String(timeLeft.days).padStart(2, '0')}</span> <br/> өдөр</div>
                <div className="time-box"><span>{String(timeLeft.hours).padStart(2, '0')}</span> <br/> цаг</div>
                <div className="time-box"><span>{String(timeLeft.minutes).padStart(2, '0')}</span> <br/> минут</div>
                <div className="time-box"><span>{String(timeLeft.seconds).padStart(2, '0')}</span> <br/> секунд</div>
              </div>
              <p className="deadline">Дуусах хугацаа: {item.endDate || "Not specified"}</p>
              
              <BidForm 
                auctionId={itemId} 
                currentPrice={item.price} 
                isActive={isAuctionActive} 
              />
              <p className="interest">👁 {item.__v || 0} хэрэглэгч сонирхож байна</p>
            </div>
          </div>

          <h2>Тендер</h2>
          <table className="bid-history-table">
            <tbody>
              <tr>
                <th>Тендер оролцогч</th>
                <th>Дуудсан үнэ</th>
                <th>Цаг</th>
              </tr>
              {bidHistory && bidHistory.length > 0 ? (
                bidHistory.map((bid, index) => (
                  <tr key={index}>
                    <td>{typeof bid.userId === 'string' && bid.userId.length > 8 
                        ? `Хэрэглэгч #${bid.userId.substring(0, 8)}...` 
                        : bid.userId}</td>
                    <td>{bid.amount}₮</td>
                    <td>{new Date(bid.timestamp).toLocaleString()}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3">No bids yet</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
      <section className="section2">
        <div className="section2-content">
          <h1>Хамгийн сүүлийн дуудлага худалдаа</h1>
          <div id="auctionContainer" className="auction-cards">
            {relatedAuctions && relatedAuctions.length > 0 ? (
              relatedAuctions.map((auction, index) => (
                <ItemCard item={auction} key={index}/>
              ))
            ) : (
              <p>Одоогоор өөр дуудлага худалдаа байхгүй байна.</p>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
