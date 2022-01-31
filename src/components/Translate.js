import React, { useState } from 'react';
import Dropdown from './Dropdown';

const options = [
  {
    label: 'Afrikaans',
    value: 'af'
  },
  {
    label: 'Arabic',
    value: 'ar'
  },
  {
    label: 'Hindi',
    value: 'hi'
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
    </div>
  )
};

export default Translate;