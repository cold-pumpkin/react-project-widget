import React from 'react';

const Link = ({ className, href, children }) => {
  const onClick = (event) => {
    // full page reload 발생하지 않도록 추가
    event.preventDefault();
    // URL 업데이트
    window.history.pushState({}, '', href);

    // 다른 컴포넌트에서 URL이 업데이트 된 것을 알 수 있도록
    const navEvent = new PopStateEvent('popstate');
    window.dispatchEvent(navEvent);
  };

  return (
  <a onClick={onClick}
    className={className} 
    href={href}
    >
    {children}
  </a>)
};

export default Link;