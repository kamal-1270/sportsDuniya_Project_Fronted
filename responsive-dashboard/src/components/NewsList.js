import React, { useContext, useState } from 'react';
import NewsContext from '../contexts/NewsContext';

const NewsList = () => {
  const { news } = useContext(NewsContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    author: '',
    type: '',
    dateRange: { start: '', end: '' },
  });

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleDateChange = (field, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      dateRange: {
        ...prevFilters.dateRange,
        [field]: value,
      },
    }));
  };

  const filteredNews = news.filter((article) => {
    const matchesSearchTerm = article.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesAuthor = filters.author ? article.author === filters.author : true;
    const matchesType = filters.type ? article.type === filters.type : true;
    const matchesDate =
      (!filters.dateRange.start || new Date(article.publishedAt) >= new Date(filters.dateRange.start)) &&
      (!filters.dateRange.end || new Date(article.publishedAt) <= new Date(filters.dateRange.end));

    return matchesSearchTerm && matchesAuthor && matchesType && matchesDate;
  });

  return (
    <div className="news-list">
      <h3>News Articles</h3>
      <div className="filters">
        <input
          type="text"
          placeholder="Search by keyword"
          value={searchTerm}
          onChange={handleSearch}
        />
        <input
          type="text"
          placeholder="Filter by author"
          name="author"
          value={filters.author}
          onChange={handleFilterChange}
        />
        <select
          name="type"
          value={filters.type}
          onChange={handleFilterChange}
        >
          <option value="">All Types</option>
          <option value="news">News</option>
          <option value="blog">Blog</option>
        </select>
        <input
          type="date"
          placeholder="Start date"
          value={filters.dateRange.start}
          onChange={(e) => handleDateChange('start', e.target.value)}
        />
        <input
          type="date"
          placeholder="End date"
          value={filters.dateRange.end}
          onChange={(e) => handleDateChange('end', e.target.value)}
        />
      </div>
      <div className="news-items">
        {filteredNews.length > 0 ? (
          filteredNews.map((article, index) => (
            <div key={index} className="news-item">
              <h4>{article.title}</h4>
              <p>Author: {article.author}</p>
              <p>Date: {new Date(article.publishedAt).toLocaleDateString()}</p>
              <p>Type: {article.type || 'Unknown'}</p>
            </div>
          ))
        ) : (
          <p>No articles match your criteria.</p>
        )}
      </div>
    </div>
  );
};

export default NewsList;
