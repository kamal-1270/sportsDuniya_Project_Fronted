import { useContext, useState, useEffect } from 'react';
import NewsContext from '../contexts/NewsContext';
import PayoutCalculator from './PayoutCalculator';
import NewsList from './NewsList';
import './Dashboard.css';
import Login from './Login';
const Dashboard = () => {
  const { news } = useContext(NewsContext);
  const [filteredNews, setFilteredNews] = useState(news);

  const handleFilter = (filter) => {
    const filtered = news.filter(article => article.author === filter.author); // Filter logic
    setFilteredNews(filtered);
  };

  return (
    <div className="dashboard">
      <PayoutCalculator />
      <NewsList/>
      <div className="news-list">
        <h3>Articles</h3>
        {filteredNews.map((article, index) => (
          <div key={index} className="news-item">
            <h4>{article.title}</h4>
            <p>Author: {article.author}</p>
            <p>Date: {article.publishedAt}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
