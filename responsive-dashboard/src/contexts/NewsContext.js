import { createContext, useState, useEffect } from 'react';

const NewsContext = createContext();

export const NewsProvider = ({ children }) => {
  const [news, setNews] = useState([]);
  
  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const response = await fetch('https://newsapi.org/v2/top-headlines?country=us&apiKey=53fa21eecf044fd08e502b1e4426f950');
      const data = await response.json();
      setNews(data.articles);
    } catch (error) {
      console.error('Error fetching news:', error);
    }
  };

  return (
    <NewsContext.Provider value={{ news }}>
      {children}
    </NewsContext.Provider>
  );
};

export default NewsContext;
