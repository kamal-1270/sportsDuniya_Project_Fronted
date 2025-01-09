export const fetchNews = async () => {
    const response = await fetch('https://newsapi.org/v2/top-headlines?country=us&apiKey=YOUR_API_KEY');
    const data = await response.json();
    return data.articles;
  };
  