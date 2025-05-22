"use client";

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function BidForm({ auctionId, currentPrice, isActive }) {
  const router = useRouter();
  const [bidAmount, setBidAmount] = useState(currentPrice);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  
  const handleBidChange = (e) => {
    setBidAmount(e.target.value);
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!bidAmount || isNaN(bidAmount) || parseFloat(bidAmount) <= currentPrice) {
      setMessage(`Дүн ${currentPrice}₮-с их байх ёстой`);
      setMessageType('error');
      return;
    }
    
    setIsSubmitting(true);
    setMessage('Саналыг илгээж байна...');
    setMessageType('info');
    
    try {
      const userId = "681ce0270163bd98b9c22d2c";
      
      const response = await fetch('/api/bids', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          auctionId,
          userId,
          amount: parseFloat(bidAmount)
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
      
      setMessage('Таны санал амжилттай бүртгэгдлээ!');
      setMessageType('success');
      
      setTimeout(() => {
        router.refresh();
      }, 1500);
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
      <form onSubmit={handleSubmit}>
        <input 
          type="number" 
          value={bidAmount} 
          onChange={handleBidChange}
          min={currentPrice + 1}
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
