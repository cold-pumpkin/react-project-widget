import React, { useState } from 'react';
import Accordion from './components/Accordion';
import Search from './components/Search';
import Dropdown from './components/Dropdown';

/* Accordion 컴포넌트로 전달할 아이템 목록
const items = [
  {
    title: 'What is React?',
    content: 'React is a frontend js framework'
  },
  {
    title: 'Why use React?',
    content: 'React is a favorite js library among engineers'
  },
  {
    title: 'How do you use React?',
    content: 'You use React by creating components'
  },
]
*/

// Dropdown 컴포넌트로 전달할 옵션 목록
const options= [
  {
    label: 'The Color Red',
    value: 'red'
  },
  {
    label: 'The Color Green',
    value: 'green'
  },
  {
    label: 'A Shade of Blue',
    value: 'blue'
  },
];

const App = () => {
  const [selected, setSelected] = useState(options[0]);
  const [showDropdown , setShowDropdown] = useState(true);

  //return <div><Accordion items={items} /></div>;
  //return <div><Search /></div>;
  return (
    <div>
    <button onClick={() => setShowDropdown(!showDropdown)}>Toggle Dropdown</button>
    {showDropdown ?
      <Dropdown 
        selected={selected} 
        onSelectedChange={setSelected}
        options={options} />
      : null
    }
    </div>
  );
}

export default App;