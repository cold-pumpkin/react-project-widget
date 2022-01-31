import React, { useState, useEffect, useRef } from 'react';

const Dropdown = ({ label, options, selected, onSelectedChange }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(); // DOM을 직접 참조할 수 있도록 해줌
  
  // 최초 렌더링 시 클릭 이벤트 리스너를 등록
  useEffect(() => {
    const onBodyClick = (event) => {
      // 1) Dropdown 컴포넌트 내부 클릭 이벤트 발생 시 닫히지 않도록 즉시 리턴
      if (ref.current.contains(event.target))
        return;

      // 2) Dropdown 컴포넌트 외부 클릭 이벤트 발생 시 닫히도록 open 상태 false로 변경
      setOpen(false);
    };

    document.body.addEventListener('click', onBodyClick, { capture: true });
    
    // 최초 렌더링 시 동작하지 않고, 이후 Dropdown 컴포넌트가 DOM에서 삭제되었을 때 호출되면서 클릭 이벤트 리스너 삭제
    return () => {
      document.body.removeEventListener('click', onBodyClick, { capture: true });
    }
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
        <label className='label'>{label}</label>
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