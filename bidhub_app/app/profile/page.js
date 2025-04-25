"use client";
import { useState } from "react";
import DepositModal from "../../components/DepositModal";
import "../../styles/Profile.css";

const orders = [
  { id: 210, date: "July 23, 2022", status: "Waiting payment", total: "$700 for 1 item" },
  { id: 210, date: "June 23, 2022", status: "Waiting payment", total: "$1,000 for 1 item" },
  { id: 210, date: "May 26, 2022", status: "Success", total: "$500 for 1 item" },
  { id: 210, date: "May 23, 2022", status: "Success", total: "$600 for 1 item" },
  { id: 210, date: "May 23, 2022", status: "Cancelled", total: "$200 for 1 item" }
];

const products = [
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
];

const transactions = [
  { id: 1, date: "2023-10-15", type: "Deposit", amount: "$500", status: "Completed" },
  { id: 2, date: "2023-10-10", type: "Withdrawal", amount: "$200", status: "Completed" },
  { id: 3, date: "2023-09-28", type: "Auction Purchase", amount: "$350", status: "Completed" },
  { id: 4, date: "2023-09-15", type: "Deposit", amount: "$1,000", status: "Completed" }
];

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState("history");
  const [isDepositModalOpen, setIsDepositModalOpen] = useState(false);
  const [walletBalance, setWalletBalance] = useState(2450);

  const handleDeposit = (depositData) => {
    
    setWalletBalance(prevBalance => prevBalance + depositData.amount);
    
    const newTransaction = {
      id: transactions.length + 1,
      date: new Date().toISOString().split('T')[0],
      type: "Deposit",
      amount: `$${depositData.amount}`,
      status: "Completed"
    };
    
    transactions.unshift(newTransaction);
  };

  return (
    <main>
      <section className="profile-header-banner">
        <h1>Хэрэглэгчийн мэдээлэл</h1>
      </section>

      <section className="profile-content">
        <aside className="sidebar">
          <div className="profile-header">
            <div className="profile-avatar">👤</div>
            <div className="profile-info">
              <h2>Батболд</h2>
              <p>john.appleseed@gmail.com</p>
              <a href="/" className="logout">Гарах</a>
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
                <p><strong>Нэр:</strong> John</p>
                <p><strong>Овог:</strong> Appleseed</p>
                <p><strong>И-мэйл:</strong> john.appleseed@gmail.com</p>
                <p><strong>Нууц үг:</strong> ******</p>
                <button className="edit-btn">Засах</button>
              </div>

              <div className="card">
                <h3>Тооцооны мэдээлэл, хаяг</h3>
                <p><strong>Нэр:</strong> John</p>
                <p><strong>Овог:</strong> Appleseed</p>
                <p><strong>Картын дугаар:</strong> 3128321043392</p>
                <p><strong>Хаяг:</strong> Jl. KH Hasyim Ashari, RT.006/RW...</p>
                <button className="edit-btn">Засах</button>
              </div>

              <div className="card">
                <h3>Хүргэлтийн мэдээлэл, хаяг</h3>
                <p><strong>Нэр:</strong> John</p>
                <p><strong>Овог:</strong> Appleseed</p>
                <p><strong>CIF/SSN:</strong> ******</p>
                <p><strong>Хаяг:</strong> Jl. KH Hasyim Ashari, RT.006/RW...</p>
                <button className="edit-btn">Засах</button>
              </div>
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
