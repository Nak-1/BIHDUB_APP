"use client";

import Image from "next/image";

import "../../styles/AboutUs.css";

import team1 from "../../assests/team1.png";
import team2 from "../../assests/team2.png";

export default function AboutUs() {
  return (
    <main>
      <section className="about-us">
        <h1>Бидний тухай</h1>
      </section>

      <div className="image-container">
        <Image src={team1} alt="Дуудлага худалдааны танхим" />
      </div>
      <section className="content">
        <div className="text-section">
          <h2>Дуудлага худалдааны зарчим</h2>
          <p>
            Дуудлага худалдаа (Auction) нь бараа, бүтээгдэхүүн, үйлчилгээ эсвэл эрхийг 
            хамгийн өндөр үнэ санал болгосон хүнд олгодог худалдааны нэг хэлбэр юм. 
            Энэ нь зах зээл дээр үнэ тогтоох, эрэлт нийлүүлэлтийг зохицуулах чухал механизм 
            болж өгдөг. Дуудлага худалдааны гол зарчмуудыг дараах байдлаар ангилж үзэж болно.
          </p>
        </div>
        <div className="image-container">
          <Image src={team2} alt="Галерей дахь үзэсгэлэн" />
        </div>
      </section>

      <section className="faq">
        <h2>Түгээмэл асуулт</h2>
        <ul className="faq-list">
          <li><a href="#">— Дансаа хэрхэн цэнэглэх вэ?</a></li>
          <li><a href="#">— Худалдааны хугацаа хэр удаан үргэлжлэх вэ?</a></li>
          <li><a href="#">— Ялагч болсон тохиолдолд төлбөрөө яаж төлөх вэ?</a></li>
        </ul>
      </section>
    </main>
  );
}