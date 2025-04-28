"use client";
import { useState } from "react";
import DepositModal from "../../components/DepositModal";
import "../../styles/Profile.css";

const orders = [ /*...*/ ];
const products = [ /*...*/ ];
const initialTransactions = [
  { id: 1, date: "2023-10-15", type: "Deposit", amount: "$500", status: "Completed" },
  { id: 2, date: "2023-10-10", type: "Withdrawal", amount: "$200", status: "Completed" },
  { id: 3, date: "2023-09-28", type: "Auction Purchase", amount: "$350", status: "Completed" },
  { id: 4, date: "2023-09-15", type: "Deposit", amount: "$1,000", status: "Completed" }
];

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState("wallet");
  const [isDepositModalOpen, setIsDepositModalOpen] = useState(false);
  const [walletBalance, setWalletBalance] = useState(2450);
  const [transactions, setTransactions] = useState(initialTransactions);
  const [modalMode, setModalMode] = useState("deposit");

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

  const handleWithdraw = (withdrawData) => {
    if (walletBalance < withdrawData.amount) {
      alert("Хэтэвчинд хангалттай мөнгө байхгүй байна!");
      return;
    }

    setWalletBalance(prevBalance => prevBalance - withdrawData.amount);

    const newTransaction = {
      id: transactions.length + 1,
      date: new Date().toISOString().split('T')[0],
      type: "Withdrawal",
      amount: `-$${withdrawData.amount}`,
      status: "Completed"
    };

    setTransactions(prev => [newTransaction, ...prev]);
  };

  return (
    <main>
      {/* Header болон Sidebar хэсгүүд энд байх ёстой */}
      
      <section className="profile-content">
        {/* Sidebar болон Navigation код орно */}

        {/* Тabs - wallet, history, auction, settings */}
        {
          activeTab === "wallet" ? (
            <div className="wallet-container">
              <div className="wallet-balance-card">
                <h3>Хэтэвчний үлдэгдэл</h3>
                <div className="balance-amount">${walletBalance}</div>
                <div className="wallet-actions">
                  <button 
                    className="wallet-btn deposit"
                    onClick={() => {
                      setModalMode("deposit");
                      setIsDepositModalOpen(true);
                    }}
                  >
                    Мөнгө оруулах
                  </button>
                  <button 
                    className="wallet-btn withdraw"
                    onClick={() => {
                      setModalMode("withdraw");
                      setIsDepositModalOpen(true);
                    }}
                  >
                    Мөнгө гаргах
                  </button>
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
          ) : activeTab === "history" ? (
            <div>Түүх харагдана (History Tab)</div>
          ) : activeTab === "auction" ? (
            <div>Дуудлага худалдаа (Auction Tab)</div>
          ) : activeTab === "settings" ? (
            <div>Тохиргоо (Settings Tab)</div>
          ) : (
            <div></div> // Хоосон div fallback
          )
        }
      </section>

      <DepositModal 
        isOpen={isDepositModalOpen}
        mode={modalMode}
        onClose={() => setIsDepositModalOpen(false)}
        onDeposit={handleDeposit}
        onWithdraw={handleWithdraw}
      />
    </main>
  );
};

export default ProfilePage;
