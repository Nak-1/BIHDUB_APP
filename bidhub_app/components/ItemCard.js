import Image from "next/image";
import "../styles/HomePage.css";

export default function ItemCard({ item }) {
  return( 
    <div className="auction-card">
      <Image
        src={item.image}
        className="auction-image"
        alt=""
        width={200}
        height={200}
      />
      <div className="auction-details">
        <h3 className="auction-title">{item.title}</h3>
        <div className="auction-price">₮ {item.price.toLocaleString()}</div>
        <div className="auction-time">Дуусах хугацаа: {item.timeLeft}</div>
        <button className="bid-button">Дуудлага өгөх</button>
      </div>
    </div>
  )
}
