import "../styles/Footer.css";

export default function Footer() {
  return (
    <footer>
      <div className="footer-content">
        <div className="footer-section">
          <h3>Бидний тухай</h3>
          <p>BIHDUB Auctions - Таны итгэлт дуудлага худалдааны платформ.</p>
        </div>
        <div className="footer-section">
          <h3>Холбоосууд</h3>
          <ul>
            <li><a href="#how-it-works">Хэрхэн ажилладаг</a></li>
            <li><a href="#terms">Үйлчилгээний нөхцөл</a></li>
            <li><a href="#privacy">Нууцлалын бодлого</a></li>
            <li><a href="#contact">Холбоо барих</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Сошиал холбоосууд</h3>
          <div className="social-links">
            <a href="#facebook" aria-label="Facebook">Facebook</a>
            <a href="#twitter" aria-label="Twitter">Twitter</a>
            <a href="#instagram" aria-label="Instagram">Instagram</a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 BIHDUB Auctions. Бүх эрх хуулиар хамгаалагдсан.</p>
      </div>
    </footer>
  );
}
