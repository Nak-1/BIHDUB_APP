"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import "../../styles/Auth.css";

export default function Auth() {
  const [activeTab, setActiveTab] = useState("signin");
  const router = useRouter();

  const handleSignIn = (e) => {
    e.preventDefault();
    localStorage.setItem("isLoggedIn", "true");
    router.push("/profile");
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    localStorage.setItem("isLoggedIn", "true");
    router.push("/profile");
  };

  return (
    <main>
      <section className="signin-header">
        <h1>Нэвтрэх / Бүртгүүлэх</h1>
      </section>

      <section className="signin-container">
        <div className="signin-form-container">
          <div className="signin-tabs">
            <button 
              className={`tab-btn ${activeTab === "signin" ? "active" : ""}`} 
              onClick={() => setActiveTab("signin")}
            >
              Нэвтрэх
            </button>
            <button 
              className={`tab-btn ${activeTab === "signup" ? "active" : ""}`} 
              onClick={() => setActiveTab("signup")}
            >
              Бүртгүүлэх
            </button>
          </div>

          {activeTab === "signin" && (
            <div className="tab-content active">
              <form className="signin-form" onSubmit={handleSignIn}>
                <div className="form-group">
                  <label htmlFor="email">И-мэйл</label>
                  <input type="email" id="email" name="email" required />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Нууц үг</label>
                  <input type="password" id="password" name="password" required />
                </div>
                <div className="form-options">
                  <div className="remember-me">
                    <input type="checkbox" id="remember" name="remember" />
                    <label htmlFor="remember">Намайг сана</label>
                  </div>
                  <a href="#" className="forgot-password">Нууц үгээ мартсан?</a>
                </div>
                <button type="submit" className="signin-btn">Нэвтрэх</button>
              </form>
              <div className="social-signin">
                <p>Эсвэл дараах сошиал хаягаар нэвтрэх</p>
                <div className="social-buttons">
                  <button className="social-btn facebook">Facebook-ээр нэвтрэх</button>
                  <button className="social-btn google">Google-ээр нэвтрэх</button>
                </div>
              </div>
            </div>
          )}

          {activeTab === "signup" && (
            <div className="tab-content active">
              <form className="signup-form" onSubmit={handleSignUp}>
                <div className="form-group">
                  <label htmlFor="fullname">Бүтэн нэр</label>
                  <input type="text" id="fullname" name="fullname" required />
                </div>
                <div className="form-group">
                  <label htmlFor="signup-email">И-мэйл</label>
                  <input type="email" id="signup-email" name="email" required />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Утасны дугаар</label>
                  <input type="tel" id="phone" name="phone" required />
                </div>
                <div className="form-group">
                  <label htmlFor="signup-password">Нууц үг</label>
                  <input type="password" id="signup-password" name="password" required />
                </div>
                <div className="form-group">
                  <label htmlFor="confirm-password">Нууц үг баталгаажуулах</label>
                  <input type="password" id="confirm-password" name="confirm-password" required />
                </div>
                <div className="form-options">
                  <div className="terms">
                    <input type="checkbox" id="terms" name="terms" required />
                    <label htmlFor="terms">Үйлчилгээний нөхцөлийг зөвшөөрч байна</label>
                  </div>
                </div>
                <button type="submit" className="signup-btn">Бүртгүүлэх</button>
              </form>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
