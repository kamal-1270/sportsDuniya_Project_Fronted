import React, { useState, useEffect } from 'react';

// Key for localStorage
const LOCAL_STORAGE_KEY = 'payoutRates';

const Dashboard = () => {
  const [payoutRates, setPayoutRates] = useState(() => {
    const storedRates = localStorage.getItem(LOCAL_STORAGE_KEY);
    return storedRates ? JSON.parse(storedRates) : {};
  });

  const [totalPayout, setTotalPayout] = useState(0);

  // Save payout rates to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(payoutRates));
  }, [payoutRates]);

  /**
   * Set a payout rate for an author.
   * @param {string} author - The name of the author.
   * @param {number} rate - The payout rate per article.
   */
  const setPayoutRate = (author, rate) => {
    setPayoutRates((prevRates) => ({
      ...prevRates,
      [author]: rate,
    }));
  };

  /**
   * Calculate total payout based on the articles and payout rates.
   * @param {Array} articles - Array of articles with their authors.
   */
  const calculateTotalPayout = (articles = []) => {
    if (!Array.isArray(articles)) {
      console.error('Invalid articles input:', articles);
      return;
    }

    const total = articles.reduce((sum, article) => {
      const rate = payoutRates[article.author] || 0;
      return sum + rate;
    }, 0);

    setTotalPayout(total);
  };

  // Example articles
  const articles = [
    { author: 'John Doe', title: 'Article 1' },
    { author: 'Jane Smith', title: 'Article 2' },
  ];

  useEffect(() => {
    // Set some sample payout rates
    setPayoutRate('John Doe', 50);
    setPayoutRate('Jane Smith', 75);

    // Calculate the total payout for the articles
    calculateTotalPayout(articles);
  }, []);

  return (
    <div>
      <h1>Total Payout: ${totalPayout}</h1>
    </div>
  );
};

export default Dashboard;
