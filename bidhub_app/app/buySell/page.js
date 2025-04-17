import Image from "next/image";
import { FaBox, FaCreditCard, FaFileAlt, FaLink, FaShoppingBag } from "react-icons/fa";
import section1 from "../../assests/section1.png";
import "../../styles/BuySell.css";

export default function BuySell() {
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
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pulvinar
                interdum enim a vestibulum, nunc cras. Gravida morbi sit sed egestas
                cursus risus imperdiet bibendum nisi enim.
              </p>
              <button className="cta-button">Эхлэх</button>
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
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </strong>{" "}
            Pulvinar interdum enim a vestibulum, nunc cras. Gravida morbi sit sed
            egestas cursus risus imperdiet bibendum nisi enim.
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
            <h3>Тендер</h3>
            <p>Сонгосон бараагаа тендер зарлах</p>
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
          <button className="register-button">Эхлэхийн тулд бүртгүүлнэ үү</button>
        </div>
      </div>
    </section>
  );
}
