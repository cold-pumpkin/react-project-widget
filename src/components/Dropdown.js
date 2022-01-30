import React, { useState, useEffect} from 'react';

const Dropdown = ({ options, selected, onSelectedChange }) => {
  const [open, setOpen] = useState(false);
  
  // 최초 렌더링 시 클릭 이벤트 리스너를 등록
  useEffect(() => {
    document.body.addEventListener('click', () => {
      console.log('click!');
      setOpen(false);
    }, 
    { capture: true }
    )
  }, []);

  const renderedOptions = options.map((option) => {
    if (option.value === selected.value) {
      return null;
    }

    return (
      <div 
        key={option.value} 
        className='item'
        onClick={() => onSelectedChange(option)}
      >
        {option.label}
      </div>
    )
  });

  return (
    <div ref={ref} className='ui form'>
      <div className='field'>
        <label className='label'>Select a Color</label>
        <div 
          onClick={() => setOpen(!open)} 
          className={`ui selection dropdown ${open ? 'visible active' : ''}`}
        >
          <i className='dropdown icon'></i>
          <div className='text'>{selected.label}</div>
          <div className={`menu ${open ? 'visible transition' : ''}`}>
            {renderedOptions}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dropdown;