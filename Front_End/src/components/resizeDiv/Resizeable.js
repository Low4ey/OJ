import React, { useRef, useEffect } from 'react';
import './resize.css';
import ProblemPage from '../../pages/ShowProblem/showProblem';

const Resizeable = () => {
  const refBox = useRef(null);
  const refRight = useRef(null);
  const refBottom = useRef(null);

  useEffect(() => {
    const resizeableElement = refBox.current;
    const styles = window.getComputedStyle(resizeableElement);
    let width = parseInt(styles.width, 10);
    let height = parseInt(styles.height, 10);
    let xCord = 0;
    let yCord = 0;
    resizeableElement.style.top = '150px';
    resizeableElement.style.left = '150px';

    // Right
    const onMouseMoveRightResize = (event) => {
      const dx = event.clientX - xCord;
      width = width + dx;
      xCord = event.clientX;
      resizeableElement.style.width = `${width}px`;
    };

    const onMouseUpRightResize = () => {
      document.removeEventListener('mousemove', onMouseMoveRightResize);
    };

    const onMouseDownRightResize = (event) => {
      xCord = event.clientX;
      const styles = window.getComputedStyle(resizeableElement);
      resizeableElement.style.left = styles.left;
      resizeableElement.style.right = null;
      document.addEventListener('mousemove', onMouseMoveRightResize);
      document.addEventListener('mouseup', onMouseUpRightResize);
    };

    // Bottom
    const onMouseMoveBottomResize = (event) => {
      const dy = event.clientY - yCord;
      height = height + dy;
      yCord = event.clientY;
      resizeableElement.style.height = `${height}px`;
    };

    const onMouseUpBottomResize = () => {
      document.removeEventListener('mousemove', onMouseMoveBottomResize);
    };

    const onMouseDownBottomResize = (event) => {
      yCord = event.clientY;
      const styles = window.getComputedStyle(resizeableElement);
      resizeableElement.style.top = styles.top;
      resizeableElement.style.bottom = null;
      document.addEventListener('mousemove', onMouseMoveBottomResize);
      document.addEventListener('mouseup', onMouseUpBottomResize);
    };

    const resizerRight = refRight.current;
    resizerRight.addEventListener('mousedown', onMouseDownRightResize);

    const resizerBottom = refBottom.current;
    resizerBottom.addEventListener('mousedown', onMouseDownBottomResize);

    return () => {
      resizerRight.removeEventListener('mousedown', onMouseDownRightResize);
      resizerBottom.removeEventListener('mousedown', onMouseDownBottomResize);
    };
  }, []);

  return (
    <>
      <h1 className='heading'>Resizable div using React. No library!!</h1>
      <div className='wrapper'>
        <div ref={refBox} className='resizeable-box'>
          <div ref={refRight} className='resizer rr'></div>
          <div ref={refBottom} className='resizer rb'></div>
        </div>
      </div>
    </>
  );
};

export default Resizeable;
