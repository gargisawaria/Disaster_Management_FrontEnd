import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import './index.css';

interface NewsItem {
  title: string;
  description: string;
  url: string;
  urlToImage: string;
}

const Description: React.FC = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1); 
  const [hasMore, setHasMore] = useState(true);

  const fetchNews = useCallback(async () => {
    if (!hasMore || loading) return;
    setLoading(true);
    try {
      const response = await axios.get('https://newsapi.org/v2/everything', {
        params: {
          q: 'disaster',
          language: 'en',
          pageSize: 8,
          page: page,
          sortBy: 'publishedAt',
          apiKey: 'a760b252ee3549fdb66ed14a1c54c9d5'
        }
      });

      const newArticles = response.data.articles;
      setNews(prev => [...prev, ...newArticles]);
      setHasMore(newArticles.length > 0);
    } catch (error) {
      console.error("Failed to fetch news:", error);
    } finally {
      setLoading(false);
    }
  }, [page, hasMore, loading]);

  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop
        >= document.documentElement.offsetHeight - 100
      ) {
        setPage(prev => prev + 1);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="news-page">
      <h1>Disaster News Updates</h1>
      <div className="news-grid">
        {news.map((article, index) => (
          <div className="news-card" key={index}>
            <img src={article.urlToImage} alt={article.title} />
            <div className="news-content">
              <h3>{article.title}</h3>
              <p>{article.description}</p>
              <a href={article.url} target="_blank" rel="noopener noreferrer">Read more</a>
            </div>
          </div>
        ))}
      </div>
      {loading && <div className="loader">
        <img src="/Flooding-animated.gif" alt="Loading..." 
          style={{ width: '150px', height: '150px', objectFit: 'contain' }} />
        </div>}
    </div>
  );
};

export default Description;
