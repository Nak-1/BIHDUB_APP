"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import team1 from "../../assests/team1.png";
import team2 from "../../assests/team2.png";
import "../../styles/AboutUs.css";

export default function AboutUs() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFaq = (index) => {
    if (activeIndex === index) {
      setActiveIndex(null);
    } else {
      setActiveIndex(index);
    }
  };

  useEffect(() => {
    const sections = document.querySelectorAll('.animate-section');
    
    setTimeout(() => {
      sections.forEach((section, index) => {
        setTimeout(() => {
          section.classList.add('visible');
        }, index * 200);
      });
    }, 100);
  }, []);

  const faqItems = [
    {
      question: "Дансаа хэрхэн цэнэглэх вэ?",
      answer: "Та өөрийн профайл руу орж 'Данс цэнэглэх' хэсэгт хандан, карт эсвэл банкны шилжүүлгээр цэнэглэнэ."
    },
    {
      question: "Худалдааны хугацаа хэр удаан үргэлжлэх вэ?",
      answer: "Худалдааны хугацаа бараа бүрийн хувьд ялгаатай бөгөөд ихэвчлэн 3-7 хоног үргэлжилнэ."
    },
    {
      question: "Ялагч болсон тохиолдолд төлбөрөө яаж төлөх вэ?",
      answer: "Төлбөрийг дансанд шилжүүлэн эсвэл системд холбогдсон төлбөрийн хэрэгслээр төлнө."
    },
    {
      question: "BIDHUB дуудлага худалдааны Веб ашиглах заавар",
      answer: `-Вэбсайт руу нэвтрэх:
Хэрэглэгч вэб хуудасны хаягаар орно.
-Хэрэглэгчийн данс үүсгэх:
Нэвтрэх хэсэгт "Бүртгүүлэх" товчийг дарж, өөрийн мэдээллээ оруулан хэрэглэгчийн данс үүсгэнэ.
Мэйл хаяг, утасны дугаар, нууц үг зэрэг мэдээллээ бөглөнө.
-Бараа нэмэх:
Вэбсайтад орсны дараа "Бараа нэмэх" товчийг дарж, худалдаанд гарах бараагаа байршуулна.
Барааны зураг, тайлбар, үнэ зэрэг мэдээллүүдийг оруулж, зарах эсвэл дуудлага худалдаагаар зарах сонголт хийнэ.
-Дуудлага худалдаанд оролцох:
Өөрийн хүссэн бараа дуудлага худалдаанд оролцох бол тухайн барааны дэлгэрэнгүй хэсэгт орж, үнэ, хугацаа зэргийг шалгана.
"Дуудлага худалдаанд оролцох" товчийг дарж, үнийн санал оруулна.
-Үнийн санал өгөх:
Дуудлага худалдаанд орох бараан дээр үнийн санал өгөх боломжтой.
Та өөрийн үнийн саналаа оруулснаар тухайн бараанд өрсөлдөх боломжтой болно.
-Худалдаа хийх:
Дуудлага худалдааны хугацаа дууссаны дараа хамгийн өндөр үнийн санал өгсөн хүн барааг худалдан авах эрхтэй болно.
Худалдан авалт хийгдсэний дараа төлбөрийг хийхийн тулд зааварчилгаа дагаж, гүйлгээ хийх.
-Төлбөр болон хүргэлт:
Бараа худалдан авахад хамгийн тохиромжтой төлбөрийн аргыг сонгоно.
Төлбөрийг амжилттай гүйцэтгэснээр бараа хэрэглэгчид хүргэгдэх болно.
-Анхаарах зүйлс:
Вэбсайт дахь мэдээллийг зөв оруулж, үнэ болон барааны мэдээлэл зөв байх шаардлагатай.
Дуудлага худалдаанд оролцохын өмнө өөрийн саналаа хянаж, хамгийн зөв шийдвэрийг гаргана уу.`
    }
  ];

  return (
    <main className="about-main">
      <section className="about-auction">
        <div className="about-container animate-section">
          <div className="about-text">
            <h1 className="title-stacked">
              <strong>BIDHUB</strong>
              <span>дуудлага</span>
              <span>худалдааны</span>
              <span>тухай</span>
            </h1>
          </div>
          <div className="about-description">
            <p>
              Ховор, хязгаарлагдмал бүтээлүүдийн дуудлага худалдааны платформ.
              Бид цуглуулагчид, хөрөнгө оруулагчид, дахин борлуулагчид болон энгийн
              худалдан авагчдад найдвартай, өрсөлдөөнт худалдааны орчин бүрдүүлж,
              үнэ цэнтэй барааг хамгийн тохиромжтой хэлбэрээр арилжих боломжийг олгодог.
            </p>
          </div>
          <div className="about-image">
            <Image src={team1} alt="Үзэсгэлэнгийн танхим" width={500} height={300} />
          </div>
        </div>
      
        <div className="auction-explained animate-section">
          <div className="auction-text">
            <p>
              Дуудлага худалдаа гэдэг нь бараа, бүтээгдэхүүний хамгийн өндөр үнэ санал болгосон хүнд худалдах аргын төрөл юм.
              Үүнийг олон нийтэд нээлттэй явуулдаг бөгөөд худалдан авагчид өөрсдийн санал болгож буй үнийг хэлж өрсөлддөг.
            </p>
          </div>
        </div>
      
        <div className="faq-section animate-section">
          <div className="faq-heading">
            <div className="circle-deco"></div>
            <h2>Түгээмэл асуулт</h2>
          </div>
          
          <div className="faq-content">
            <div className="faq-list">
              {faqItems.map((item, index) => (
                <div 
                  key={index} 
                  className={`faq-item ${activeIndex === index ? 'active' : ''}`}
                >
                  <button 
                    className="faq-question" 
                    onClick={() => toggleFaq(index)}
                  >
                    <span className="question-text">— {item.question}</span>
                    <span className="faq-icon">{activeIndex === index ? '−' : '+'}</span>
                  </button>
                  <div className="faq-answer">
                    <div className="answer-content">
                      {item.answer}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="faq-image-container">
              <div className="faq-image">
                <Image src={team2} alt="Асуулт хариулт зураг" width={500} height={300} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}