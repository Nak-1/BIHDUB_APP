"use client";

import Image from "next/image";
import { useState } from "react";

import "../../styles/sell.css";

export default function SellPage() {
  const [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    try {
      const response = await fetch("/api/sell", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setMessage("Амжилттай илгээгдлээ!");
        event.target.reset();
      } else {
        setMessage("Алдаа гарлаа");
      }
    } catch (err) {
      console.error(err);
      setMessage("Сервертэй холбогдоход алдаа гарлаа");
    }
  };

  return (
   
      <main>
        <section className="contact-header">
          <h1>Дуудлага худалдаанд бараа бүртгүүлэх</h1>
        </section>

        <section className="sell-wrapper">
          <form className="sell-card" onSubmit={handleSubmit} encType="multipart/form-data">
            <h3 className="sell-title">Барааны мэдээлэл</h3>

            <label className="sell-group">
              <h2>Барааны зураг</h2>
              <input type="file" name="itemImage" accept="image/*" required />
            </label>

            <label className="sell-group">
              <h2>Нэр</h2>
              <input type="text" name="itemName" placeholder="Жишээ: Artstage" required />
            </label>

            <label className="sell-group">
              <h2>Тайлбар</h2>
              <textarea name="description" rows="4" placeholder="Барааны дэлгэрэнгүй тайлбар…" required></textarea>
            </label>

            <label className="sell-group">
              <h2>Эхлэх үнэ (₮)</h2>
              <input type="number" name="startPrice" min="0" step="1000" required />
            </label>

            <div style={{ display: "flex", gap: "12px" }}>
              <label className="sell-group half">
                <h2>Эхлэх цаг</h2>
                <input type="datetime-local" name="startDate" required />
              </label>

              <label className="sell-group half">
                <h2>Дуусах цаг</h2>
                <input type="datetime-local" name="endDate" required />
              </label>
            </div>

            <button type="submit" className="sell-submit">Дуудлага үүсгэх</button>
            {message && <p style={{ marginTop: "10px", color: "green" }}>{message}</p>}
          </form>
        </section>
      </main>
  );
}
