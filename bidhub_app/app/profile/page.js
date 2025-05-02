"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import DepositModal from "../../components/DepositModal";
import "../../styles/Profile.css";

const ProfilePage = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("history");
  const [isDepositModalOpen, setIsDepositModalOpen] = useState(false);
  const [walletBalance, setWalletBalance] = useState(2450);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [orders, setOrders] = useState([
    { id: 210, date: "July 23, 2022", status: "Waiting payment", total: "$700 for 1 item" },
    { id: 211, date: "June 23, 2022", status: "Waiting payment", total: "$1,000 for 1 item" },
    { id: 212, date: "May 26, 2022", status: "Success", total: "$500 for 1 item" },
    { id: 213, date: "May 23, 2022", status: "Success", total: "$600 for 1 item" },
    { id: 214, date: "May 23, 2022", status: "Cancelled", total: "$200 for 1 item" }
  ]);
  
  const [products, setProducts] = useState([
    {
      id: 1,
      image: null,
      name: "Plant and Pots",
      yourBid: "$1,000",
      currentBid: "$800",
      status: "Эхэлсэн"
    },
    {
      id: 2,
      image: null,
      name: "Bird in Forest",
      yourBid: "$1,200",
      currentBid: "$1,100",
      status: "Эхэлсэн"
    },
    {
      id: 3,
      image: null,
      name: "Woman in Forest",
      yourBid: "$700",
      currentBid: "$700",
      status: "Эхэлсэн"
    }
  ]);
  
  const [transactions, setTransactions] = useState([
    { id: 1, date: "2023-10-15", type: "Deposit", amount: "$500", status: "Completed" },
    { id: 2, date: "2023-10-10", type: "Withdrawal", amount: "$200", status: "Completed" },
    { id: 3, date: "2023-09-28", type: "Auction Purchase", amount: "$350", status: "Completed" },
    { id: 4, date: "2023-09-15", type: "Deposit", amount: "$1,000", status: "Completed" }
  ]);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const userId = localStorage.getItem("userId");
    
    if (!isLoggedIn) {
      router.push("/auth");
      return;
    }
    
    async function fetchUserData() {
      try {
        setLoading(true);
        
        const response = await fetch('/api/auth');
        if (!response.ok) throw new Error('Failed to fetch user data');
        
        const data = await response.json();
        
        let currentUser;
        if (userId) {
          currentUser = data.users.find(user => user.id.toString() === userId);
        } else {
          const userEmail = localStorage.getItem("userEmail");
          currentUser = data.users.find(user => user.email === userEmail);
        }
        
        if (!currentUser) {
          throw new Error('User not found');
        }
        
        setUserData(currentUser);
      } catch (err) {
        console.error('Error fetching user data:', err);
        setError('Failed to load user data. Please try again later.');
      } finally {
        setLoading(false);
      }
    }
    
    fetchUserData();
  }, [router]);

  const handleDeposit = (depositData) => {
    setWalletBalance(prevBalance => prevBalance + depositData.amount);
    
    const newTransaction = {
      id: transactions.length + 1,
      date: new Date().toISOString().split('T')[0],
      type: "Deposit",
      amount: `$${depositData.amount}`,
      status: "Completed"
    };
    
    setTransactions(prev => [newTransaction, ...prev]);
  };
  
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userId");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userName");
    localStorage.removeItem("userAvatar");
    localStorage.removeItem("userRole");
    
    router.push("/auth");
  };

  if (loading) return <div className="loading">Loading user data...</div>;
  if (error) return <div className="error-message">{error}</div>;
  if (!userData) return <div className="error-message">User not found. Please <a href="/auth">login again</a>.</div>;

  return (
    <main>
      <section className="profile-header-banner">
        <h1>Хэрэглэгчийн мэдээлэл</h1>
      </section>

      <section className="profile-content">
        <aside className="sidebar">
          <div className="profile-header">
            <div className="profile-avatar">
              <Image 
                src={userData.avatar} 
                alt="" 
                width={60} 
                height={60} 
                className="avatar-image"
              />
            </div>
            <div className="profile-info">
              <h2>{userData.name}</h2>
              <p>{userData.email}</p>
              <button onClick={handleLogout} className="logout">Гарах</button>
            </div>
          </div>
          <nav className="menu">
            <button 
              className={`menu-item ${activeTab === "history" ? "active" : ""}`}
              onClick={() => setActiveTab("history")}
            >
              Гүйлгээний түүх
            </button>
            <button
              className={`menu-item ${activeTab === "auction" ? "active" : ""}`}
              onClick={() => setActiveTab("auction")}
            >
              Дуудлага худалдааны түүх
            </button>
            <button
              className={`menu-item ${activeTab === "settings" ? "active" : ""}`}
              onClick={() => setActiveTab("settings")}
            >
              Бүртгэлийн тохиргоо
            </button>
            <button
              className={`menu-item ${activeTab === "wallet" ? "active" : ""}`}
              onClick={() => setActiveTab("wallet")}
            >
              Хэтэвч
            </button>
          </nav>
        </aside>

        {
          activeTab === "history" ? (
            <div className="table-container">
              <table className="order-table">
                <thead>
                  <tr>
                    <th>Захиалга</th>
                    <th>Хугацаа</th>
                    <th>Статус</th>
                    <th>Нийт дүн</th>
                    <th>Үйлдэл</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order, index) => (
                    <tr key={index}>
                      <td><a href={`#${order.id}`}>#{order.id}</a></td>
                      <td>{order.date}</td>
                      <td>{order.status}</td>
                      <td>{order.total}</td>
                      <td><button className="view-btn">Харах</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : activeTab === "auction" ? (
            <div className="container">
              <table className="auction-table">
                <thead>
                  <tr>
                    <th>Бүтээгдэхүүн</th>
                    <th>Таны санал</th>
                    <th>Одоогийн тендер</th>
                    <th>Статус</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.id}>
                      <td className="product-info">
                        {product.image ? (
                          <img src={product.image} alt={product.name} className="product-img" />
                        ) : (
                          <div className="product-img-placeholder"></div>
                        )}
                        <span>{product.name}</span>
                      </td>
                      <td>{product.yourBid}</td>
                      <td>{product.currentBid}</td>
                      <td>{product.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : activeTab === "settings" ? (
            <div className="content">
              <div className="card">
                <h3>Хувийн мэдээлэл</h3>
                <p><strong>Нэр:</strong> {userData.name}</p>
                <p><strong>И-мэйл:</strong> {userData.email}</p>
                <p><strong>Утас:</strong> {userData.phone || "Not provided"}</p>
                <p><strong>Байршил:</strong> {userData.location || "Not provided"}</p>
                <p><strong>Бүртгүүлсэн огноо:</strong> {new Date(userData.joinDate).toLocaleDateString()}</p>
                <p><strong>Үнэлгээ:</strong> {userData.rating} / 5</p>
                <button className="edit-btn">Засах</button>
              </div>

              <div className="card">
                <h3>Тооцооны мэдээлэл, хаяг</h3>
                <p><strong>Нэр:</strong> {userData.name.split(' ')[0]}</p>
                <p><strong>Овог:</strong> {userData.name.split(' ').slice(1).join(' ')}</p>
                <p><strong>Картын дугаар:</strong> ************</p>
                <p><strong>Хаяг:</strong> {userData.location || "Not provided"}</p>
                <button className="edit-btn">Засах</button>
              </div>

              <div className="card">
                <h3>Хүргэлтийн мэдээлэл, хаяг</h3>
                <p><strong>Нэр:</strong> {userData.name.split(' ')[0]}</p>
                <p><strong>Овог:</strong> {userData.name.split(' ').slice(1).join(' ')}</p>
                <p><strong>CIF/SSN:</strong> ******</p>
                <p><strong>Хаяг:</strong> {userData.location || "Not provided"}</p>
                <button className="edit-btn">Засах</button>
              </div>
              
              {userData.bio && (
                <div className="card">
                  <h3>Миний тухай</h3>
                  <p>{userData.bio}</p>
                  <button className="edit-btn">Засах</button>
                </div>
              )}
              
              {userData.socialMedia && Object.keys(userData.socialMedia).length > 0 && (
                <div className="card">
                  <h3>Сошиал хаягууд</h3>
                  {Object.entries(userData.socialMedia).map(([platform, handle]) => (
                    <p key={platform}><strong>{platform}:</strong> {handle}</p>
                  ))}
                  <button className="edit-btn">Засах</button>
                </div>
              )}
            </div>
          ) : activeTab === "wallet" ? (
            <div className="wallet-container">
              <div className="wallet-balance-card">
                <h3>Хэтэвчний үлдэгдэл</h3>
                <div className="balance-amount">${walletBalance}</div>
                <div className="wallet-actions">
                  <button 
                    className="wallet-btn deposit"
                    onClick={() => setIsDepositModalOpen(true)}
                  >
                    Мөнгө оруулах
                  </button>
                  <button className="wallet-btn withdraw">Мөнгө гаргах</button>
                </div>
              </div>
              
              {/* <div className="wallet-stats">
                <div className="stat-card">
                  <h4>Зарсан бараа</h4>
                  <div className="stat-value">{userData.itemsSold || 0}</div>
                </div>
                <div className="stat-card">
                  <h4>Авсан бараа</h4>
                  <div className="stat-value">{userData.itemsBought || 0}</div>
                </div>
              </div> */}
              
              <div className="wallet-transactions">
                <h3>Сүүлийн гүйлгээнүүд</h3>
                <table className="transaction-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Огноо</th>
                      <th>Төрөл</th>
                      <th>Дүн</th>
                      <th>Статус</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.map((transaction) => (
                      <tr key={transaction.id}>
                        <td>#{transaction.id}</td>
                        <td>{transaction.date}</td>
                        <td>{transaction.type}</td>
                        <td>{transaction.amount}</td>
                        <td>{transaction.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : null
        }
      </section>

      <DepositModal 
        isOpen={isDepositModalOpen}
        onClose={() => setIsDepositModalOpen(false)}
        onDeposit={handleDeposit}
      />
    </main>
  );
};

export default ProfilePage;