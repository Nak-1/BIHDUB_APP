"use client";

import ItemCard from "@/components/ItemCard";
import Image from "next/image";
import { useEffect, useState } from "react";
import image1 from "../../assests/item1.png";
import auctionData from "../../data/auctions.json";
import "../../styles/HomePage.css";
import "../../styles/ItemInfo.css";

export default function ItemInfo() {
  const [bidAmount, setBidAmount] = useState(70000);
  const [timeLeft, setTimeLeft] = useState({
    days: 7,
    hours: 18,
    minutes: 35,
    seconds: 47
  });
  
  const handleBidChange = (e) => {
    setBidAmount(e.target.value);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prevTime => {
        let { days, hours, minutes, seconds } = prevTime;
        
        if (seconds > 0) {
          seconds -= 1;
        } else {
          seconds = 59;
          if (minutes > 0) {
            minutes -= 1;
          } else {
            minutes = 59;
            if (hours > 0) {
              hours -= 1;
            } else {
              hours = 23;
              if (days > 0) {
                days -= 1;
              } else {
                clearInterval(timer);
                return prevTime;
              }
            }
          }
        }
        
        return { days, hours, minutes, seconds };
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

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
                src={image1} 
                alt="art" 
                width={400} 
                height={300}
              />
            </div>

            <div className="details">
              <h1>Artstage</h1>
              <p className="author">by <i>Jose Guillermo</i></p>
              <p className="price">Одоогийн үнэ: <strong>70'000₮</strong></p>
              <div className="countdown">
                <div className="time-box"><span>{String(timeLeft.days).padStart(2, '0')}</span> <br/> өдөр</div>
                <div className="time-box"><span>{String(timeLeft.hours).padStart(2, '0')}</span> <br/> цаг</div>
                <div className="time-box"><span>{String(timeLeft.minutes).padStart(2, '0')}</span> <br/> минут</div>
                <div className="time-box"><span>{String(timeLeft.seconds).padStart(2, '0')}</span> <br/> секунд</div>
              </div>
              <p className="deadline">Дуусах хугацаа: 16.4.2023 08:06:33 GMT+8</p>
              <div className="bid-section">
                <input 
                  type="number" 
                  value={bidAmount} 
                  onChange={handleBidChange}
                /> 
                <button>Дуудлага</button>
              </div>
              <p className="interest">👁 10 хэрэглэгч сонирхож байна</p>
            </div>
          </div>

          <h2>Тендер</h2>
          <table>
            <tbody>
              <tr>
                <th>Тендер оролцогч</th>
                <th>Дуудсан үнэ</th>
                <th>Цаг</th>
              </tr>
              <tr>
                <td>g********3</td>
                <td>70'000₮</td>
                <td>7/8/2022 03:21:59</td>
              </tr>
              <tr>
                <td>g********3</td>
                <td>70'000₮</td>
                <td>3/8/2022 02:49:13</td>
              </tr>
              <tr>
                <td>g********3</td>
                <td>70'000₮</td>
                <td>2/8/2022 11:10:39</td>
              </tr>
              <tr>
                <td>g********3</td>
                <td>70'000₮</td>
                <td>30/7/2022 03:03:04</td>
              </tr>
            </tbody>
          </table>
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
