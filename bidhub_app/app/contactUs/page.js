import "../../styles/ContactUs.css";

export default function ContactUs() {
  return (
    <main>
      <section className="contact-header">
        <h1>Холбоо барих</h1>
      </section>
      <section className="contact-container">
        <div className="map-container">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2673.764837127652!2d106.91724231562401!3d47.91853797920536!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5d96ed0c3c5e71b9%3A0x7acad2b0afb5f7f0!2sUlaanbaatar%2C%20Mongolia!5e0!3m2!1sen!2s!4v1635825429619!5m2!1sen!2s"
            width="100%" 
            height="450" 
            style={{border:0}} 
            allowFullScreen="" 
            loading="lazy"
          />
        </div>

        <div className="contact-wrapper">
          <div className="contact-info">
            <div className="contact-box">
              <h3>BIDHUB дуудлага худалдаа</h3>
              <div className="info-item">
                <span className="icon">📍</span>
                <p>Улаанбаатар хот, Сүхбаатар дүүрэг</p>
              </div>
              <div className="info-item">
                <span className="icon">📞</span>
                <p>+976 8813-908-8211</p>
              </div>
              <div className="info-item">
                <span className="icon">✉</span>
                <p>info@bidhub.mn</p>
              </div>
            </div>
          </div>

          <div className="contact-form">
            <h3>Бидэнтэй холбогдох</h3>
            <form>
              <div className="form-group">
                <input type="text" name="name" placeholder="Таны нэр" required />
              </div>
              <div className="form-group">
                <input type="email" name="email" placeholder="И-мэйл хаяг" required />
              </div>
              <div className="form-group">
                <input type="text" name="subject" placeholder="Гарчиг" required />
              </div>
              <div className="form-group">
                <textarea name="message" rows="5" placeholder="Таны зурвас"></textarea>
              </div>
              <button type="submit" className="submit-btn">Илгээх</button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
} 