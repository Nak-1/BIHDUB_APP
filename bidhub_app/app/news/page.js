"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import "../../styles/News.css";

export default function News() {
  const router = useRouter();
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/news?limit=10');
        
        if (!response.ok) {
          throw new Error('Failed to fetch news');
        }
        
        const data = await response.json();
        setNews(data.news || []);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching news:', err);
        setError('Failed to load news. Please try again later.');
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleDateString('mn-MN', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
    } catch (err) {
      return dateString;
    }
  };

  if (error) {
    return (
      <main>
        <section className="news-header">
          <h1>Мэдээ, мэдээлэл</h1>
        </section>
        <section className="news-container">
          <div className="error-message">
            <p>{error}</p>
            <button onClick={() => window.location.reload()}>Дахин оролдох</button>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main>
      <section className="news-header">
        <h1>Мэдээ, мэдээлэл</h1>
      </section>

      <section className="news-container">
        {loading ? (
          <div className="loading">
            <p>Мэдээ ачаалж байна...</p>
          </div>
        ) : news.length === 0 ? (
          <div className="no-news">
            <p>Одоогоор мэдээ байхгүй байна.</p>
          </div>
        ) : (
          <>
            <div className="featured-news">
              <div className="featured-image">
                <Image 
                  src={news[0].image || "/assests/news/placeholder.jpg"} 
                  alt={news[0].title}
                  width={800}
                  height={400}
                  priority
                />
              </div>
              <div className="featured-content">
                <span className="news-category">{news[0].category}</span>
                <h2>{news[0].title}</h2>
                <p className="news-date">{formatDate(news[0].date)}</p>
                <p className="news-summary">{news[0].summary}</p>
                <button 
                  className="read-more-btn"
                  onClick={() => router.push(`/news/${news[0].id}`)}
                >
                  Дэлгэрэнгүй
                </button>
              </div>
            </div>

            <div className="news-list">
              {news.slice(1).map((item) => (
                <div className="news-card" key={item.id}>
                  <div className="news-image">
                    <Image 
                      src={item.image || "/assests/news/placeholder.jpg"} 
                      alt={item.title}
                      width={300}
                      height={200}
                    />
                  </div>
                  <div className="news-card-content">
                    <span className="news-category">{item.category}</span>
                    <h3>{item.title}</h3>
                    <p className="news-date">{formatDate(item.date)}</p>
                    <p className="news-summary">{item.summary}</p>
                    <button 
                      className="read-more-btn"
                      onClick={() => router.push(`/news/${item.id}`)}
                    >
                      Дэлгэрэнгүй
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </section>
    </main>
  );
}
