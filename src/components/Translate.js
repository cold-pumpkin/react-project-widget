import React, { useState } from 'react';
import Dropdown from './Dropdown';
import Convert from './Convert';

const options = [
  {
    label: 'Korean',
    value: 'ko'
  },
  {
    label: 'Japanese',
    value: 'ja'
  },
  {
    label: 'English',
    value: 'en'
  },
  {
    label: 'Spanish',
    value: 'es'
  },
  {
    label: 'French',
    value: 'fr'
  },
];

const Translate = () => {
  const [language, setLanguage] = useState(options[0]);
  const [text, setText] = useState('');

  return (
    <div>
      <div className='ui form'>
        <div className='field'>
          <label>Enter Text</label>
          <input value={text} onChange={(e) => setText(e.target.value)} />
        </div>
      </div>
      <Dropdown 
        label="Select a Language"
        selected={language}             // props 1) 선택된 언어
        onSelectedChange={setLanguage}  // props 2) 선택 시 동작할 콜백 함수
        options={options}               // props 3) 선택 가능한 옵션 목록
      />
      <hr />
      <h3 className='ui header'>Output</h3>
      <Convert language={language} text={text} />
    </div>
  )
};

export default Translate;