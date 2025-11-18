import { useEffect, type JSX } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserInfo } from '@/api/auth';

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await getUserInfo(); // 백엔드에서 세션 체크
      } catch (err) {
        console.error(err);
        navigate('/login'); // 세션 없으면 로그인 페이지로
      }
    };

    checkAuth();
  }, [navigate]);

  return children;
};

export default ProtectedRoute;
