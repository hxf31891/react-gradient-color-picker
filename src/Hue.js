import React, { useRef, useState } from "react";
import { usePicker } from "./context";
import usePaintHue from "./usePaintHue";

const Hue = () => {
  const barRef = useRef(null);
  const { handleHue, internalHue } = usePicker();
  const [dragging, setDragging] = useState(false);
  usePaintHue(barRef);

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
    >
      <div className="ps-rl bar-wrap-inner" onMouseUp={stopDragging}>
        <div className="c-resize ps-rl" onMouseMove={e => handleMove(e)}>
          <div
            style={{ left: internalHue * 0.766666666666667, top: 2 }}
            className="handle"
            onMouseDown={handleDown}
          />
          <canvas
            ref={barRef}
            width="294px"
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
