import React, { useState } from 'react';
import Accordion from './components/Accordion';
import Search from './components/Search';
import Dropdown from './components/Dropdown';
import Translate from './components/Translate';
import Route from './components/Route';

// Accordion 컴포넌트로 전달할 아이템 목록
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
  {
    label: 'Very deep black',
    value: 'black'
  },
  {
    label: 'Snow white',
    value: 'white'
  }
];


const App = () => {
  const [selected, setSelected] = useState(options[0]);

  return (
    <div>
      <Route path="/">
        {/* Accordion이 Route의 children props으로 전달됨 */}
        <Accordion items={items} />
      </Route>
      <Route path="/list">
        <Search />
      </Route>
      <Route path="/dropdown">
        <Dropdown 
          label="Select a color"
          options={options}
          selected={selected}
          onSelectedChange={setSelected}
        />
      </Route>
      <Route path="/translate">
        <Translate />
      </Route>
    </div>
  );
}

export default App;