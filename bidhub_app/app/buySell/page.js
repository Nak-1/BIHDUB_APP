import Image from "next/image";
import "../../styles/BuySell.css";

import section1 from "../../assests/section1.png";

export default function BuySell() {
  return (
    <section>
      <div className="auction-container">
        <div className="header">
          <Image
            src={section1}
            width={300}
            height={200}
            alt="Auction Platform Preview" 
          />
          <div className="header-text">
            <h1>Авах, зарах</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pulvinar
              interdum enim a vestibulum, nunc cras. Gravida morbi sit sed egestas
              cursus risus imperdiet bibendum nisi enim.
            </p>
          </div>
        </div>

        <div className="tabs">
          <span className="active-tab">Бараагаа санал болго</span>
          <span>Худалдаачид болох</span>
        </div>

        <div className="info">
          <p>
            <strong>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </strong>{" "}
            Pulvinar interdum enim a vestibulum, nunc cras. Gravida morbi sit sed
            egestas cursus risus imperdiet bibendum nisi enim.
          </p>
        </div>

        <div className="features">
          <div className="feature-item">
            <div className="icon">🔗</div>
            <p>Вэбсайтад бүртгүүлэх үү</p>
          </div>
          <div className="feature-item">
            <div className="icon">📄</div>
            <p>Мэдээлэл, хүлээн авах багцын үү</p>
          </div>
          <div className="feature-item">
            <div className="icon">🛍️</div>
            <p>Сонгосон бараагаа тендер зарлах</p>
          </div>
          <div className="feature-item">
            <div className="icon">💳</div>
            <p>Төлбөрийн төлөвлөгөө гүйцэтгэх</p>
          </div>
          <div className="feature-item">
            <div className="icon">📦</div>
            <p>Барааг тань заасан байршилд хүргэнэ</p>
          </div>
        </div>

        <div className="registration">
          <p>
            <strong>Бүртгүүлэх мэдээллээ бөглөөд</strong> анхны худалдан авалтадаа 10%
          </p>
          <button className="register-button">Эхлэхийн тулд бүртгүүлнэ үү</button>
        </div>
      </div>
    </section>
  );
}