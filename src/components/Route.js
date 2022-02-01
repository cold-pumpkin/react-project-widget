import { useEffect, useState } from 'react';

const Route = ({ path, children }) => {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const onLocationChange = () => {
      //console.log("location changed!!");
      setCurrentPath(window.location.pathname);
    }

    // 이벤트 리스너 등록 : popstate 이벤트 발생할 때 마다 onLocationChange 동작
    window.addEventListener('popstate', onLocationChange);

    // Route 컴포넌트를 화면에서 더 이상 보여주지 않을 경우 이벤트 리스너도 clear 되도록
    return () => {
      window.removeEventListener('popstate', onLocationChange);
    }
  }, []);

  return currentPath === path
    ? children
    : null;
}

export default Route;