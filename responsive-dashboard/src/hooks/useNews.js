import { useContext } from 'react';
import NewsContext from '../contexts/NewsContext';

const useNews = () => {
  const { news } = useContext(NewsContext);

  return { news };
};

export default useNews;
