import "../../styles/ItemInfo.css";

export default function ItemInfo() {
  return (
    <main>
      <section className="contact-header">
        <h1>Авах / зарах</h1>
      </section>
      <section>
        <div className="container">
          <div className="auction">
            <div className="image-section">
              <img src="../assests/buysell1.png" alt="art" />
            </div>

            <div className="details">
              <h1>Artstage</h1>
              <p className="author">by <i>Jose Guillermo</i></p>
              <p className="price">Одоогийн үнэ: <strong>70'000₮</strong></p>
              <div className="countdown">
                  <div className="time-box"><span>07</span> <br/> өдөр</div>
                  <div className="time-box"><span>18</span> <br/> цаг</div>
                  <div className="time-box"><span>35</span> <br/> минут</div>
                  <div className="time-box"><span>47</span> <br/> секунд</div>
              </div>
              <p className="deadline">Дуусах хугацаа: 16.4.2023 08:06:33 GMT+8</p>
              <div className="bid-section">
                  <input type="number" value="70000" /> 
                  <button>Дуудлага</button>
              </div>
              <p className="interest">👁 10 хэрэглэгч сонирхож байна</p>
            </div>
          </div>

          <h2>Тендер</h2>
          <table>
            <tr>
              <th>Тендер оролцогч</th>
              <th>Дуудсан үнэ</th>
              <th>Цаг</th>
            </tr>
            <tr>
              <td>g********3</td>
              <td>70'000₮</td>
              <td>7/8/2022 03:21:59</td>
            </tr>
            <tr>
              <td>g********3</td>
              <td>70'000₮</td>
              <td>3/8/2022 02:49:13</td>
            </tr>
            <tr>
              <td>g********3</td>
              <td>70'000₮</td>
              <td>2/8/2022 11:10:39</td>
            </tr>
            <tr>
              <td>g********3</td>
              <td>70'000₮</td>
              <td>30/7/2022 03:03:04</td>
            </tr>
          </table>
        </div>
        <h3>Бусад дуудлага худалдаа</h3>
      </section>
      {/* <section className="section2">
        <div className="section2-content">
          <div id="auctionContainer" className="auction-cards">
            <div className="auction-card">
              <img src="../assests/item1.png" alt="Auction Item 1" className="auction-image" />
              <div className="auction-details">
                <h3 className="auction-title">Бүтээгдэхүүн 1</h3>
                <div className="auction-price">₮ 250,000</div>
                <div className="auction-time">Дуусах хугацаа: 2 цаг</div>
                <button className="bid-button">Дуудлага өгөх</button>
              </div>
            </div>
            
            <div className="auction-card">
              <img src="../assests/item2.png" alt="Auction Item 2" className="auction-image" />
              <div className="auction-details">
                <h3 className="auction-title">Бүтээгдэхүүн 2</h3>
                <div className="auction-price">₮ 180,000</div>
                <div className="auction-time">Дуусах хугацаа: 5 цаг</div>
                <button className="bid-button">Дуудлага өгөх</button>
              </div>
            </div>
            
            <div className="auction-card">
              <img src="../assests/item3.png" alt="Auction Item 3" className="auction-image" />
              <div className="auction-details">
                <h3 className="auction-title">Бүтээгдэхүүн 3</h3>
                <div className="auction-price">₮ 320,000</div>
                <div className="auction-time">Дуусах хугацаа: 1 өдөр</div>
                <button className="bid-button">Дуудлага өгөх</button>
              </div>
            </div>
          </div>
        </div>
      </section> */}
    </main>
  );
}