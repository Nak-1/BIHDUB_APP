"use client";

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { socket } from '../socket';

export default function BidForm({ auctionId, currentPrice, isActive }) {
  const router = useRouter();
  const [bidAmount, setBidAmount] = useState(currentPrice);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [displayPrice, setDisplayPrice] = useState(currentPrice);
  
  useEffect(() => {
    socket.emit("join_auction", auctionId);
    
    socket.on("bid_update", (bidData) => {
      if (bidData.auctionId === auctionId) {
        setDisplayPrice(bidData.amount);
        if (bidData.userId !== "681ce0270163bd98b9c22d2c") {
          setMessage(`Шинэ дуудлага: ${bidData.amount}₮`);
          setMessageType('info');
          setTimeout(() => setMessage(''), 3000);
        }
      }
    });
    
    return () => {
      socket.off("bid_update");
    };
  }, [auctionId]);
  
  const handleBidChange = (e) => {
    setBidAmount(e.target.value);
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!bidAmount || isNaN(bidAmount) || parseFloat(bidAmount) <= displayPrice) {
      setMessage(`Дүн ${displayPrice}₮-с их байх ёстой`);
      setMessageType('error');
      return;
    }
    
    setIsSubmitting(true);
    setMessage('Саналыг илгээж байна...');
    setMessageType('info');
    
    try {
      const userId = "681ce0270163bd98b9c22d2c";
      const amount = parseFloat(bidAmount);
      
      const response = await fetch('/api/bids', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          auctionId,
          userId,
          amount
        }),
      });
      
      if (!response.ok) {
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.indexOf("application/json") !== -1) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to place bid');
        } else {
          const errorText = await response.text();
          console.error('Server returned non-JSON response:', errorText);
          throw new Error('Server error occurred');
        }
      }
      
      const data = await response.json();
      
      socket.emit("new_bid", {
        auctionId,
        userId,
        amount,
        timestamp: new Date()
      });
      
      setDisplayPrice(amount);
      setMessage('Таны санал амжилттай бүртгэгдлээ!');
      setMessageType('success');
      
    } catch (error) {
      console.error('Error placing bid:', error);
      setMessage(error.message || 'Саналыг бүртгэхэд алдаа гарлаа');
      setMessageType('error');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  if (!isActive) {
    return (
      <div className="bid-section inactive">
        <p className="auction-status">Дуудлага худалдаа идэвхгүй байна</p>
      </div>
    );
  }
  
  return (
    <div className="bid-section">
      <div className="current-price">
        <p>Одоогийн үнэ: <strong>{displayPrice}₮</strong></p>
      </div>
      
      <form onSubmit={handleSubmit}>
        <input 
          type="number" 
          value={bidAmount} 
          onChange={handleBidChange}
          min={displayPrice + 1}
          step="1000"
        /> 
        <button 
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Илгээж байна...' : 'Дуудлага'}
        </button>
      </form>
      
      {message && (
        <div className={`bid-message ${messageType}`}>
          <p>{message}</p>
        </div>
      )}
    </div>
  );
}
