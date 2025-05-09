"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";
import "../../../styles/NewsDetail.css";

export default function NewsDetail({ params }) {
  const router = useRouter();
  const resolvedParams = use(params);
  const id = resolvedParams.id;
  const [newsItem, setNewsItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [relatedNews, setRelatedNews] = useState([]);

  useEffect(() => {
    const fetchNewsDetail = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/news/${id}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch news details');
        }
        
        const data = await response.json();
        setNewsItem(data);
        
        if (data.category) {
          const relatedResponse = await fetch(`/api/news?category=${data.category}&limit=3`);
          if (relatedResponse.ok) {
            const relatedData = await relatedResponse.json();
            setRelatedNews(relatedData.news.filter(item => item.id !== parseInt(id)));
          }
        }
        
        setLoading(false);
      } catch (err) {
        console.error('Error fetching news details:', err);
        setError('Failed to load news details. Please try again later.');
        setLoading(false);
      }
    };

    if (id) {
      fetchNewsDetail();
    }
  }, [id]);

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

  const goBack = () => {
    router.back();
  };

  if (error) {
    return (
      <main>
        <section className="news-header">
          <h1>Мэдээ, мэдээлэл</h1>
        </section>
        <section className="news-detail-container">
          <div className="error-message">
            <p>{error}</p>
            <button onClick={goBack}>Буцах</button>
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

      <section className="news-detail-container">
        {loading ? (
          <div className="loading">
            <p>Мэдээ ачаалж байна...</p>
          </div>
        ) : !newsItem ? (
          <div className="not-found">
            <p>Мэдээ олдсонгүй.</p>
            <button onClick={goBack}>Буцах</button>
          </div>
        ) : (
          <>
            <div className="news-detail">
              <div className="news-detail-header">
                <button className="back-button" onClick={goBack}>
                  ← Буцах
                </button>
                <span className="news-category">{newsItem.category}</span>
                <h1>{newsItem.title}</h1>
                <div className="news-meta">
                  <p className="news-author">Зохиогч: {newsItem.author}</p>
                  <p className="news-date">Огноо: {formatDate(newsItem.date)}</p>
                  <p className="news-views">Үзсэн: {newsItem.viewCount}</p>
                </div>
              </div>
              
              <div className="news-detail-image">
                <Image 
                  src={newsItem.image || "/assests/news/placeholder.jpg"} 
                  alt={newsItem.title}
                  width={1200}
                  height={600}
                  priority
                />
              </div>
              
              <div className="news-detail-content">
                <p className="news-summary">{newsItem.summary}</p>
                <div className="news-content">
                  {newsItem.content.split('\n').map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
                
                {newsItem.tags && newsItem.tags.length > 0 && (
                  <div className="news-tags">
                    <p>Холбоотой түлхүүр үгс:</p>
                    <div className="tags-list">
                      {newsItem.tags.map((tag, index) => (
                        <span key={index} className="tag">{tag}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {relatedNews.length > 0 && (
              <div className="related-news">
                <h2>Холбоотой мэдээ</h2>
                <div className="related-news-list">
                  {relatedNews.map((item) => (
                    <div className="related-news-card" key={item.id}>
                      <div className="related-news-image">
                        <Image 
                          src={item.image || "/assests/news/placeholder.jpg"} 
                          alt={item.title}
                          width={200}
                          height={150}
                        />
                      </div>
                      <div className="related-news-content">
                        <h3>{item.title}</h3>
                        <p className="news-date">{formatDate(item.date)}</p>
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
              </div>
            )}
          </>
        )}
      </section>
    </main>
  );
}
