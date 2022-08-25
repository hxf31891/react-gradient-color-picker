import React, { useRef, useState } from "react";
import { usePicker } from "./context";
import usePaintHue from "./usePaintHue";

const Hue = () => {
  const barRef = useRef(null);
  const { handleHue, internalHue, squareSize } = usePicker();
  const [dragging, setDragging] = useState(false);
  usePaintHue(barRef, squareSize);

  const stopDragging = () => {
    setDragging(false);
  };

  const handleDown = () => {
    setDragging(true);
  };

  const handleMove = e => {
    if (dragging) {
      handleHue(e);
    }
  };

  const handleClick = e => {
    if (!dragging) {
      handleHue(e);
    }
  };

  return (
    <div
      className="bar-wrap"
      onMouseEnter={stopDragging}
      onMouseLeave={stopDragging}
      style={{ width: squareSize + 36 }}
    >
      <div className="ps-rl bar-wrap-inner" onMouseUp={stopDragging} style={{ width: squareSize + 30 }}>
        <div className="c-resize ps-rl" onMouseMove={e => handleMove(e)}>
          <div
            style={{ left: internalHue * ((squareSize - 18) / 360), top: 2 }}
            className="handle"
            onMouseDown={handleDown}
          />
          <canvas
            ref={barRef}
            width={`${squareSize}px`}
            height="14px"
            style={{ position: "relative", borderRadius: 14 }}
            onClick={e => handleClick(e)}
          />
        </div>
      </div>
    </div>
  );
};

export default Hue;
