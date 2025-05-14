"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import "../../styles/sell.css";

export default function SellPage() {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    itemName: "",
    description: "",
    startPrice: "",
    startDate: "",
    endDate: "",
    itemImage: null
  });
  const [previewImage, setPreviewImage] = useState(null);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    
    if (name === "itemImage" && files && files[0]) {
      setFormData({
        ...formData,
        itemImage: files[0]
      });
      
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewImage(e.target.result);
      };
      reader.readAsDataURL(files[0]);
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
    
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ""
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.itemName.trim()) {
      newErrors.itemName = "Барааны нэр оруулна уу";
    }
    
    if (!formData.description.trim()) {
      newErrors.description = "Тайлбар оруулна уу";
    }
    
    if (!formData.startPrice || formData.startPrice <= 0) {
      newErrors.startPrice = "Зөв үнэ оруулна уу";
    }
    
    if (!formData.startDate) {
      newErrors.startDate = "Эхлэх цаг оруулна уу";
    }
    
    if (!formData.endDate) {
      newErrors.endDate = "Дуусах цаг оруулна уу";
    } else if (new Date(formData.endDate) <= new Date(formData.startDate)) {
      newErrors.endDate = "Дуусах цаг нь эхлэх цагаас хойш байх ёстой";
    }
    
    if (!formData.itemImage) {
      newErrors.itemImage = "Зураг оруулна уу";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!validateForm()) {
      setMessage("Формын мэдээллийг бүрэн оруулна уу");
      setMessageType("error");
      return;
    }
    
    setIsSubmitting(true);
    setMessage("Илгээж байна...");
    setMessageType("info");
    
    try {
      const imageBase64 = await convertImageToBase64(formData.itemImage);

      const auctionData = {
        title: formData.itemName,
        description: formData.description,
        startingPrice: parseFloat(formData.startPrice),
        price: parseFloat(formData.startPrice),
        startDate: formData.startDate,
        endDate: formData.endDate,
        image: imageBase64,
        id: Date.now(),
        author: "User",
        bids: []
      };

      const response = await fetch("/api/bids", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(auctionData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Server error:", errorText);
        throw new Error(`Server responded with ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();

      setMessage("Амжилттай илгээгдлээ! Таны бараа дуудлага худалдаанд бүртгэгдлээ.");
      setMessageType("success");
      
      setFormData({
        itemName: "",
        description: "",
        startPrice: "",
        startDate: "",
        endDate: "",
        itemImage: null
      });
      setPreviewImage(null);
      
      setTimeout(() => {
        router.push('/');
      }, 2000);
    } catch (err) {
      console.error("Error during form submission:", err);
      setMessage(err.message || "Сервертэй холбогдоход алдаа гарлаа");
      setMessageType("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const convertImageToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
      reader.readAsDataURL(file);
    });
  };

  useEffect(() => {
    const now = new Date();
    const localISOString = new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString().slice(0, 16);
    
    const startDateInput = document.querySelector('input[name="startDate"]');
    const endDateInput = document.querySelector('input[name="endDate"]');
    
    if (startDateInput) startDateInput.min = localISOString;
    if (endDateInput) endDateInput.min = localISOString;
  }, []);

  return (
    <main>
      <section className="contact-header">
        <h1>Дуудлага худалдаанд бараа бүртгүүлэх</h1>
      </section>

      <section className="sell-wrapper">
        <form className="sell-card" onSubmit={handleSubmit}>
          <h3 className="sell-title">Барааны мэдээлэл</h3>

          <div className="sell-group">
            <h2>Барааны зураг</h2>
            <div className="image-upload-container">
              <input 
                type="file" 
                name="itemImage" 
                id="itemImage"
                accept="image/*" 
                onChange={handleChange}
                className={errors.itemImage ? "error-input" : ""}
              />
              <label htmlFor="itemImage" className="upload-label">
                {previewImage ? (
                  <div className="preview-container">
                    <img src={previewImage} alt="Preview" className="image-preview" />
                    <span className="change-image">Зураг солих</span>
                  </div>
                ) : (
                  <div className="upload-placeholder">
                    <span className="upload-icon">+</span>
                    <span>Зураг сонгох</span>
                  </div>
                )}
              </label>
              {errors.itemImage && <p className="error-message">{errors.itemImage}</p>}
            </div>
          </div>

          <div className="sell-group">
            <h2>Нэр</h2>
            <input 
              type="text" 
              name="itemName" 
              value={formData.itemName}
              onChange={handleChange}
              placeholder="Жишээ: Artstage" 
              className={errors.itemName ? "error-input" : ""}
            />
            {errors.itemName && <p className="error-message">{errors.itemName}</p>}
          </div>

          <div className="sell-group">
            <h2>Тайлбар</h2>
            <textarea 
              name="description" 
              value={formData.description}
              onChange={handleChange}
              rows="4" 
              placeholder="Барааны дэлгэрэнгүй тайлбар…" 
              className={errors.description ? "error-input" : ""}
            ></textarea>
            {errors.description && <p className="error-message">{errors.description}</p>}
          </div>

          <div className="sell-group">
            <h2>Эхлэх үнэ (₮)</h2>
            <input 
              type="number" 
              name="startPrice" 
              value={formData.startPrice}
              onChange={handleChange}
              min="0" 
              step="1000" 
              className={errors.startPrice ? "error-input" : ""}
            />
            {errors.startPrice && <p className="error-message">{errors.startPrice}</p>}
          </div>

          <div className="date-container">
            <div className="sell-group half">
              <h2>Эхлэх цаг</h2>
              <input 
                type="datetime-local" 
                name="startDate" 
                value={formData.startDate}
                onChange={handleChange}
                className={errors.startDate ? "error-input" : ""}
              />
              {errors.startDate && <p className="error-message">{errors.startDate}</p>}
            </div>

            <div className="sell-group half">
              <h2>Дуусах цаг</h2>
              <input 
                type="datetime-local" 
                name="endDate" 
                value={formData.endDate}
                onChange={handleChange}
                className={errors.endDate ? "error-input" : ""}
              />
              {errors.endDate && <p className="error-message">{errors.endDate}</p>}
            </div>
          </div>

          <button 
            type="submit" 
            className={`sell-submit ${isSubmitting ? 'submitting' : ''}`}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Илгээж байна...' : 'Дуудлага үүсгэх'}
          </button>
          
          {message && (
            <div className={`message-container ${messageType}`}>
              <p>{message}</p>
            </div>
          )}
        </form>
      </section>
    </main>
  );
}
