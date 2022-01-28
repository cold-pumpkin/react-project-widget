import React from 'react';
import Accordion from './components/Accordion';
import Search from './components/Search';


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

const App = () => {
  //return <div><Accordion items={items} /></div>;
  return <div><Search /></div>;
}

export default App;