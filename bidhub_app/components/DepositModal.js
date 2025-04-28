'use client';

import { useState } from 'react';
import '../styles/DepositModal.css';

const DepositModal = ({ isOpen, onClose, onDeposit }) => {
  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [nameOnCard, setNameOnCard] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onDeposit({
      amount: parseFloat(amount),
      paymentMethod,
      cardDetails: paymentMethod === 'card' ? {
        cardNumber,
        expiryDate,
        cvv,
        nameOnCard
      } : null
    });
    
    setAmount('');
    setCardNumber('');
    setExpiryDate('');
    setCvv('');
    setNameOnCard('');
    
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="deposit-modal">
        <div className="modal-header">
          <h2>Мөнгө оруулах</h2>
          <button className="close-button" onClick={onClose}>&times;</button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="amount">Дүн ($)</label>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Оруулах дүнгээ бичнэ үү"
              required
              min="1"
              step="0.01"
            />
          </div>
          
          <div className="form-group">
            <label>Төлбөрийн хэлбэр</label>
            <div className="payment-methods">
              <label className={`payment-method ${paymentMethod === 'card' ? 'selected' : ''}`}>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="card"
                  checked={paymentMethod === 'card'}
                  onChange={() => setPaymentMethod('card')}
                />
                <span>Кредит/Дебит карт</span>
              </label>
              
              <label className={`payment-method ${paymentMethod === 'bank' ? 'selected' : ''}`}>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="bank"
                  checked={paymentMethod === 'bank'}
                  onChange={() => setPaymentMethod('bank')}
                />
                <span>Банкны шилжүүлэг</span>
              </label>
            </div>
          </div>
          
          {paymentMethod === 'card' && (
            <>
              <div className="form-group">
                <label htmlFor="cardNumber">Картын дугаар</label>
                <input
                  type="text"
                  id="cardNumber"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  placeholder="XXXX XXXX XXXX XXXX"
                  required
                />
              </div>
              
              <div className="form-row">
                <div className="form-group half">
                  <label htmlFor="expiryDate">Дуусах хугацаа</label>
                  <input
                    type="text"
                    id="expiryDate"
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(e.target.value)}
                    placeholder="MM/YY"
                    required
                  />
                </div>
                
                <div className="form-group half">
                  <label htmlFor="cvv">CVV</label>
                  <input
                    type="text"
                    id="cvv"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value)}
                    placeholder="XXX"
                    required
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="nameOnCard">Картын нэр</label>
                <input
                  type="text"
                  id="nameOnCard"
                  value={nameOnCard}
                  onChange={(e) => setNameOnCard(e.target.value)}
                  placeholder="Картан дээрх нэр"
                  required
                />
              </div>
            </>
          )}
          
          {paymentMethod === 'bank' && (
            <div className="bank-details">
              <p>Банкны дансны мэдээлэл:</p>
              <ul>
                <li><strong>Банк:</strong> Хаан Банк</li>
                <li><strong>Дансны дугаар:</strong> 5001234567</li>
                <li><strong>Хүлээн авагч:</strong> BIDHUB LLC</li>
                <li><strong>Гүйлгээний утга:</strong> [Таны бүртгэлтэй имэйл]</li>
              </ul>
              <p className="note">Тэмдэглэл: Банкны шилжүүлэг хийсний дараа таны данс 24 цагийн дотор цэнэглэгдэх болно.</p>
            </div>
          )}
          
          <div className="form-actions">
            <button type="button" className="cancel-btn" onClick={onClose}>Цуцлах</button>
            <button type="submit" className="submit-btn">Баталгаажуулах</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DepositModal;
