import React, { useState } from "react";
import { SlidersIcon, InputsIcon, PaletteIcon } from "./icon";
import { usePicker } from "../context";
import EyeDropper from "./EyeDropper";
import { config } from "../constants";
import AdvancedControls from "./AdvancedControls";
import ComparibleColors from "./ComparibleColors";
import GradientControls from "./GradientControls";

var { defaultColor, defaultGradient } = config;

const Controls = ({
  locales,
  hideEyeDrop,
  hideAdvancedSliders,
  hideColorGuide,
  hideInputType,
  hideColorTypeBtns,
  hideGradientControls,
  hideGradientType,
  hideGradientAngle,
  hideGradientStop,
}) => {
  const {
    isGradient,
    internalOnChange,
    previousColors,
    previousGraidents,
    handleChange
  } = usePicker();
  const [openAdvanced, setOpenAdvanced] = useState(false);
  const [openComparibles, setOpenComparibles] = useState(false);
  const [openInputType, setOpenInputType] = useState(false);
  const noTools =
    hideEyeDrop && hideAdvancedSliders && hideColorGuide && hideInputType;

  const solidColor = previousColors?.[0] || defaultColor;
  const gradientColor = previousGraidents?.[0] || defaultGradient;

  const setSolid = () => {
    internalOnChange(solidColor);
  };

  const setGradient = () => {
    internalOnChange(gradientColor);
  };

  const allRightControlsHidden =
    hideEyeDrop && hideAdvancedSliders && hideColorGuide && hideInputType;
  const allControlsHidden = allRightControlsHidden && hideColorTypeBtns;

  if (allControlsHidden) {
    if (isGradient && !hideGradientControls) {
      return (
        <GradientControls
          hideGradientType={hideGradientType}
          hideGradientAngle={hideGradientAngle}
          hideGradientStop={hideGradientStop}
        />
      );
    } else {
      return null;
    }
  } else {
    return (
      <div style={{ paddingTop: 12, paddingBottom: 4 }}>
        <div style={{ width: "100%" }} className='ac jsb'>
          <ColorTypeBtns
            hideColorTypeBtns={hideColorTypeBtns}
            setGradient={setGradient}
            isGradient={isGradient}
            setSolid={setSolid}
            locales={locales}
          />

          {!allRightControlsHidden && (
            <div
              style={{ display: noTools ? "none" : "" }}
              className="rbgcp-control-btn-wrapper"
            >
              {!hideEyeDrop && <EyeDropper onSelect={handleChange} />}
              <div
                style={{ display: hideAdvancedSliders ? "none" : "flex" }}
                id="rbgcp-advanced-btn"
                className={`rbgcp-control-icon-btn rbgcp-advanced-btn ${openAdvanced && "rbgcp-control-btn-selected"}`}
                onClick={() => setOpenAdvanced(!openAdvanced)}
              >
                <SlidersIcon color={openAdvanced ? "#568CF5" : ""} />
              </div>
              <div
                style={{ display: hideColorGuide ? "none" : "flex" }}
                id="rbgcp-comparibles-btn"
                className={`rbgcp-control-icon-btn rbgcp-comparibles-btn ${openComparibles && "rbgcp-control-btn-selected"}`}
                onClick={() => setOpenComparibles(!openComparibles)}
              >
                <PaletteIcon color={openComparibles ? "#568CF5" : ""} />
              </div>
              <div
                style={{ display: hideInputType ? "none" : "flex" }}
                id="rbgcp-color-model-btn"
                className={`rbgcp-control-icon-btn rbgcp-color-model-btn ${openInputType && "rbgcp-control-btn-selected"}`}
                onClick={() => setOpenInputType(!openInputType)}
              >
                <InputsIcon color={openInputType ? "#568CF5" : ""} />
                <InputTypeDropdown
                  openInputType={openInputType}
                  setOpenInputType={setOpenInputType}
                />
              </div>
            </div>
          )}
        </div>
        {!hideAdvancedSliders && (
          <AdvancedControls openAdvanced={openAdvanced} />
        )}
        {!hideColorGuide && (
          <ComparibleColors openComparibles={openComparibles} />
        )}
        {isGradient && !hideGradientControls && (
          <GradientControls
            hideGradientType={hideGradientType}
            hideGradientAngle={hideGradientAngle}
            hideGradientStop={hideGradientStop}
          />
        )}
      </div>
    );
  }
};

export default Controls;

const InputTypeDropdown = ({ openInputType, setOpenInputType }) => {
  const { inputType, setInputType } = usePicker();
  const vTrans = openInputType
    ? "visibility 0ms linear"
    : "visibility 100ms linear 150ms";
  const zTrans = openInputType
    ? "z-index 0ms linear"
    : "z-index 100ms linear 150ms";
  const oTrans = openInputType
    ? "opacity 120ms linear"
    : "opacity 150ms linear 50ms";

  const handleInputType = (e, val) => {
    if (openInputType) {
      e.stopPropagation();
      setInputType(val);
      setOpenInputType(false);
    }
  };

  return (
    <div
      style={{
        visibility: openInputType ? "visible" : "hidden",
        zIndex: openInputType ? "" : -100,
        opacity: openInputType ? 1 : 0,
        transition: `${oTrans}, ${vTrans}, ${zTrans}`,
      }}
      className="rbgcp-color-model-dropdown"
    >
      <div
        className={`rbgcp-control-btn rbgcp-color-model-dropdown-btn ${inputType === "rgb" && "rbgcp-control-btn-selected"}`}
        onClick={(e) => handleInputType(e, "rgb")}
      >
        RGB
      </div>
      <div
        className={`rbgcp-control-btn rbgcp-color-model-dropdown-btn ${inputType === "hsl" && "rbgcp-control-btn-selected"}`}
        onClick={(e) => handleInputType(e, "hsl")}
      >
        HSL
      </div>
      <div
        className={`rbgcp-control-btn rbgcp-color-model-dropdown-btn ${inputType === "hsv" && "rbgcp-control-btn-selected"}`}
        onClick={(e) => handleInputType(e, "hsv")}
      >
        HSV
      </div>
      <div
        className={`rbgcp-control-btn rbgcp-color-model-dropdown-btn ${inputType === "cmyk" && "rbgcp-control-btn-selected"}`}
        onClick={(e) => handleInputType(e, "cmyk")}
      >
        CMYK
      </div>
    </div>
  );
};

const ColorTypeBtns = ({ hideColorTypeBtns, isGradient, setSolid, setGradient, locales }) => {
  if (hideColorTypeBtns) {
    return <div style={{ width: 1 }} />
  } else {
    return(
      <div className="rbgcp-control-btn-wrapper">
        <div
          onClick={setSolid}
          id="rbgcp-solid-btn"
          className={`rbgcp-control-btn rbgcp-solid-btn ${!isGradient && "rbgcp-control-btn-selected"}`}
        >
          {locales?.CONTROLS?.SOLID}
        </div>
        <div
          onClick={setGradient}
          id="rbgcp-gradient-btn"
          className={`rbgcp-control-btn rbgcp-gradient-btn ${isGradient && "rbgcp-control-btn-selected"}`}
        >
          {locales?.CONTROLS?.GRADIENT}
        </div>
      </div>
    )
  }
}

export const controlBtnStyles = (selected) => {
  return {
    background: selected ? "white" : "rgba(255,255,255,0)",
    color: selected ? "#568CF5" : "",
    boxShadow: selected
      ? "1px 1px 3px rgba(0,0,0,.2)"
      : "1px 1px 3px rgba(0,0,0,0)",
  };
};
