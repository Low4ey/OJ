import React, { useRef } from 'react';
// import './Resize.css'; // Import your CSS file

function Resize() {
  const resizerRef = useRef(null);
  const sidebarRef = useRef(null);

  function initResizerFn() {
    let x, w;

    function rs_mousedownHandler(e) {
      x = e.clientX;

      const sbWidth = window.getComputedStyle(sidebarRef.current).width;
      w = parseInt(sbWidth, 10);

      document.addEventListener('mousemove', rs_mousemoveHandler);
      document.addEventListener('mouseup', rs_mouseupHandler);
    }

    function rs_mousemoveHandler(e) {
      const dx = e.clientX - x;
      const cw = w + dx; // complete width

      if (cw < 700) {
        sidebarRef.current.style.width = `${cw}px`;
      }
    }

    function rs_mouseupHandler() {
      // remove event mousemove && mouseup
      document.removeEventListener('mouseup', rs_mouseupHandler);
      document.removeEventListener('mousemove', rs_mousemoveHandler);
    }

    resizerRef.current.addEventListener('mousedown', rs_mousedownHandler);
  }

  initResizerFn();

  return (
    <div className="sb-cover">
      <div className="sidebar" ref={sidebarRef}>
        <div className="resizer" ref={resizerRef}></div>
        <div className="header">
          <h3>Sidebar Menu</h3>
        </div>
        <ul className='sl'>
          <li>Sidebar menu list 1</li>
          <li>Sidebar menu list 2</li>
          <li>Sidebar menu list 3</li>
          <li>Sidebar menu list 4</li>
          <li>Sidebar menu list 5</li>
          <li>Sidebar menu list 6</li>
          <li>Sidebar menu list 7</li>
          <li>Sidebar menu list 8</li>
          <li>Sidebar menu list 9</li>
        </ul>
      </div>
    </div>
  );
}

export default Resize;
