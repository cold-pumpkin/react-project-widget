import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Search = () => {
  const [term, setTerm] = useState('React');
  /*  옵션 1) 입력한 term의 값 바뀔 떄마다 이벤트 핸들러에서 위키피디아 API 호출
   *   - 구현 쉽고 직관적이지만, onChange 이벤트와 검색 기능의 커플링이 커짐
   *  옵션 2) term이 setTerm에 의해 변경되고, 그에 따라 Rerendering 될 때마다 위키피디아 API 호출 (good)
   *   - 검색 기능을 onChange 이벤트와 분리하여 재사용하기 좋고, 파라미터에 따라 trigger 할 수 있도록 구현이 가능 
   *   - 변경되는 시점을 캐치하는 코드 작성 추가 필요 (useEffect)
   */
  const [debouncedTerm, setDebouncedTerm] = useState(term);
  const [results, setResults] = useState([]);

  // useEffect 동작 타이밍 1) []     : 컴포넌트가 처음 렌더링 될 때
  // useEffect 동작 타이밍 2) 없음    : 컴포넌트가 처음 렌더링 될 때 + 렌더링 될 때마다
  // useEffect 동작 타이밍 3) [data] : 컴포넌트가 처음 렌더링 될 때 + 렌더링 될 때마다 + [..] 안의 어떤 데이터가 변경될 때마다

  // 1. term 변경 시 마다 타이머 1초 재설정, 1초간 변경 없으면 term을 debouncedTerm에 셋팅
  useEffect(() => {
    /* 동작순서
    - 첫 렌더링 시 useEffect에 전달된 setTimeout() 호출됨, debouncedTerm을 입력한 값으로 셋팅
        & return에 지정된 clearTimeout()를 리턴 (호출은 안함)
    - term 상태 변경될 때 마다 return에 지정된 clearTimeout()가 먼저 동작 
        & useEffect에 전달된 setTimeout()가 호출됨, debouncedTerm을 입력한 값으로 셋팅
    */
    const timeoutId = setTimeout(() => {
      setDebouncedTerm(term);  // 1초 지났을 시 debouncedTerm 상태를 변경
    }, 1000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [term]);

  // 2. debouncedTerm 변경 시 마다 debouncedTerm으로 검색 API 호출
  useEffect(() => {
    // useEffect에 직접적으로 aysnc() 사용하지 못함
    /* 방법 1) */
    const search = async () => {
      const {data} = await axios.get('https://en.wikipedia.org/w/api.php?', {
        params: {
          action: 'query',
          list: 'search',
          origin: '*',
          format: 'json',
          srsearch: debouncedTerm
        }
      });
      setResults(data.query.search);
    }
    /* 방법 2)
    (async () => {
      await axios.get('url');
    })();

     * 방법 3)
    axios.get('url')
      .then((response) => {
        console.log(response.data);
      });
    */
    
    search();
  }, [debouncedTerm]);  // useEffect 끝

  

  const renderedResults = results.map((result) => {
    return (
      <div key={result.pageid} className='item'>
        <div className='right floated content'>
          <a 
            className='ui button'
            href={`https://en.wikipedia.org?curid=${result.pageid}`}
          >
            Go
          </a>
        </div>
        <div className='content'>
          <div className='header'>
            {result.title}
          </div>
          {/* XSS Attack에 노출될 위험 - 신뢰할 수 없는 URL 호출 시 원치않는 결과가 그대로 화면에 보여지거나 동작할 수 있음 */}
          <span dangerouslySetInnerHTML={{ __html: result.snippet }}></span>
          {/* {result.snippet} */}
        </div>
      </div>
    )
  })

  return (
    <div className='ui form'>
      <div className='field'>
        <label>Enter Search Term</label>
        <input 
          value={term}
          onChange={e => setTerm(e.target.value)}
          className='input' />
      </div>
      <div className='ui celled list'>{renderedResults}</div>
    </div>
  )
}

export default Search;