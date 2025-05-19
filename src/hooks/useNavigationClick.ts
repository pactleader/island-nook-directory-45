import { useNavigate } from 'react-router-dom';

export const useNavigationClick = () => {
  const navigate = useNavigate();

  const handleNavigationClick = (path: string) => {
    navigate(path);
  };

  return {
    handleNavigationClick
  };
}; 