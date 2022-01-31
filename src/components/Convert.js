import React, { useState, useEffect } from "react"
import axios from 'axios';

const Convert = ({ language, text }) => {
  const [translated, setTranslated] = useState('');
  const [debouncedText, setDebouncedText] = useState(text);

  // 1) text를 debouncedText로 업데이트 하기 위해 0.5초 마다 타이머 셋팅
  //    & 타이머를 취소하는 함수 리턴 (0.5초 안에 text가 변경되어 rerendering 시점에 동작)
  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedText(text);
    }, 500);

    return () => {
      clearTimeout(timerId);
    }
  }, [text]);

  // 2) debouncedText 업데이트 될 때마다 구글 번역 API 호출
  useEffect(() => {
    const doTranslation = async () => {
      const { data } = await axios.post('https://translation.googleapis.com/language/translate/v2', {}, {
        params: {
          q: debouncedText,
          target: language.value,
          key: 'AIzaSyCHUCmpR7cT_yDFHC98CZJy2LTms-IwDlM'
        }
      });
      setTranslated(data.data.translations[0].translatedText);
    };

    doTranslation();
  }, [language, debouncedText]);  // 최초 렌더링 & 상태 변경 될 때마다 리렌더링 되면서 동작
  
  return (
    <div>
      <h1 className="ui header">{translated}</h1> 
    </div>
  );
}

export default Convert;