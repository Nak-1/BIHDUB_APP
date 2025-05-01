import Image from "next/image";
import { useRouter } from "next/navigation";
import "../styles/ItemCard.css";

export default function ItemCard({ item }) {
  const router = useRouter();

  const navigateToItemInfo = (itemId) => {
    router.push(`/itemInfo/${itemId}`);
  };

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
        <button className="bid-button" onClick={() => navigateToItemInfo(item.id)}>Дуудлага өгөх</button>
      </div>
    </div>
  )
}
