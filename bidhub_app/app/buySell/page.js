"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaBox, FaCreditCard, FaFileAlt, FaLink, FaShoppingBag } from "react-icons/fa";
import section1 from "../../assests/section1.png";
import "../../styles/BuySell.css";

export default function BuySell() {
  const router = useRouter();

  return (
    <section className="buy-sell-section">
      <div className="auction-container">
        <div className="header">
          <div className="header-content">
            <div className="header-image-container">
              <Image
                src={section1}
                width={400}
                height={300}
                alt="Auction Platform Preview"
                className="header-image"
                priority
              />
            </div>
            <div className="header-text">
              <h1>Авах, зарах</h1>
              <p>
              Бид танд найдвартай дуудлага худалдаанд цахимаар оролцох болон өөрийн бараагаа дуудлага худалдаанд зарах боломжийг олгоно
              </p>
              <button className="cta-button" onClick={() => {router.push("/auctions")}}>Оролцох</button>
              <button className="cta-button1" onClick={() => {router.push("/sell")}}>Үүсгэх</button>
            </div>
          </div>
        </div>

        <div className="tabs-container">
          <div className="tabs">
            <span className="active-tab">Бараагаа санал болго</span>
            <span>Худалдаачид болох</span>
          </div>
        </div>

        <div className="info">
          <h2>Хэрхэн ажилладаг вэ?</h2>
          <p>
            <strong>
              дуудлага худалдаанд цахимаар оролцох, өөрийнхөө барааг цахимаар дуудага худалдаанд оруулах.
            </strong>{" "}
            Бид танд найдвартай дуудлага худалдаанд цахимаар оролцох болон өөрийн бараагаа дуудлага худалдаанд зарах боломжийг олгоно
          </p>
        </div>

        <div className="features">
          <div className="feature-item">
            <div className="icon">
              <FaLink />
            </div>
            <h3>Бүртгүүлэх</h3>
            <p>Вэбсайтад бүртгүүлэх үү</p>
          </div>
          <div className="feature-item">
            <div className="icon">
              <FaFileAlt />
            </div>
            <h3>Мэдээлэл</h3>
            <p>Мэдээлэл, хүлээн авах багцын үү</p>
          </div>
          <div className="feature-item">
            <div className="icon">
              <FaShoppingBag />
            </div>
            <h3>Дуудлага худалдаа</h3>
            <p>Сонгосон бүтээгдэхүүнийхээ үнийг дуудах</p>
          </div>
          <div className="feature-item">
            <div className="icon">
              <FaCreditCard />
            </div>
            <h3>Төлбөр</h3>
            <p>Төлбөрийн төлөвлөгөө гүйцэтгэх</p>
          </div>
          <div className="feature-item">
            <div className="icon">
              <FaBox />
            </div>
            <h3>Хүргэлт</h3>
            <p>Барааг тань заасан байршилд хүргэнэ</p>
          </div>
        </div>

        <div className="testimonials">
          <h2>Хэрэглэгчдийн сэтгэгдэл</h2>
          <div className="testimonial-container">
            <div className="testimonial">
              <p>"Маш хялбар, хурдан үйлчилгээ. Би дахин ашиглах болно!"</p>
              <div className="testimonial-author">- Батаа Д.</div>
            </div>
            <div className="testimonial">
              <p>"Энэ платформ миний бизнесийг өсгөхөд тусалсан."</p>
              <div className="testimonial-author">- Сараа Б.</div>
            </div>
            <div className="testimonial">
              <p>"Хамгийн сайн үнэ цэнийг олох хамгийн хялбар арга зам."</p>
              <div className="testimonial-author">- Болд Т.</div>
            </div>
          </div>
        </div>

        <div className="registration">
          <h2>Өнөөдөр эхлэцгээе</h2>
          <p>
            <strong>Бүртгүүлэх мэдээллээ бөглөөд</strong> анхны худалдан авалтадаа 10% хөнгөлөлт авна
          </p>
          <button className="register-button" onClick={() => {router.push("/auth")}}>Эхлэхийн тулд бүртгүүлнэ үү</button>
        </div>
      </div>
    </section>
  );
}
