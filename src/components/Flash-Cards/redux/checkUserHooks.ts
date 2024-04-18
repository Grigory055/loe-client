import { useState, useEffect } from 'react';

function useCookieExistence(cookieName) {
  const [cookiesExist, setCookiesExist] = useState(false);

  useEffect(() => {
    const cookies = document.cookie.split(';').filter(cookie => cookie.trim().startsWith(cookieName));
    setCookiesExist(cookies.length > 0);
  }, [cookieName]);

  return cookiesExist;
}

export default useCookieExistence;