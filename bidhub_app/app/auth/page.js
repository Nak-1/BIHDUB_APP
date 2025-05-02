"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import "../../styles/Auth.css";

export default function Auth() {
  const [activeTab, setActiveTab] = useState("signin");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    
    const email = e.target.email.value;
    const password = e.target.password.value;
    
    try {
      const response = await fetch('/api/auth');
      if (!response.ok) throw new Error('Failed to fetch user data');
      
      const data = await response.json();
      
      const user = data.users.find(user => user.email === email);
      
      if (!user) {
        setError("Invalid email or password");
        setLoading(false);
        return;
      }
      
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userId", user.id.toString());
      localStorage.setItem("userEmail", user.email);
      localStorage.setItem("userName", user.name);
      localStorage.setItem("userAvatar", user.avatar);
      localStorage.setItem("userRole", user.role);
      
      router.push("/profile");
    } catch (error) {
      console.error("Login error:", error);
      setError("An error occurred. Please try again.");
      setLoading(false);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    
    const fullname = e.target.fullname.value;
    const email = e.target.email.value;
    const phone = e.target.phone.value;
    const password = e.target.password.value;
    const confirmPassword = e.target["confirm-password"].value;
    
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }
    
    try {
      const response = await fetch('/api/users');
      if (!response.ok) throw new Error('Failed to fetch user data');
      
      const data = await response.json();
      const existingUser = data.users.find(user => user.email === email);
      
      if (existingUser) {
        setError("User with this email already exists");
        setLoading(false);
        return;
      }
      
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userEmail", email);
      localStorage.setItem("userName", fullname);
      
      router.push("/profile");
    } catch (error) {
      console.error("Registration error:", error);
      setError("An error occurred. Please try again.");
      setLoading(false);
    }
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
                  {error && (
                    <div className="error-message">
                      {error}
                    </div>
                  )}
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
                <button type="submit" className="signin-btn" disabled={loading}>
                  {loading ? "Уншиж байна..." : "Нэвтрэх"}
                </button>
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
                  {error && (
                    <div className="error-message">
                      {error}
                    </div>
                  )}
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
                <button type="submit" className="signup-btn" disabled={loading}>
                  {loading ? "Бүртгэж байна..." : "Бүртгүүлэх"}
                </button>
              </form>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
