declare function ColorPicker({ value, onChange, hideControls, hideInputs, hideOpacity, hidePresets, hideHue, presets, hideEyeDrop, hideAdvancedSliders, hideColorGuide, hideInputType, hideColorTypeBtns, hideGradientType, hideGradientAngle, hideGradientStop, hideGradientControls, width, height, style, className, }: {
    value?: string;
    onChange?: (value: string) => void;
    hideControls?: boolean;
    hideInputs?: boolean;
    hideOpacity?: boolean;
    hidePresets?: boolean;
    hideHue?: boolean;
    presets?: string[];
    hideEyeDrop?: boolean;
    hideAdvancedSliders?: boolean;
    hideColorGuide?: boolean;
    hideInputType?: boolean;
    hideColorTypeBtns?: boolean;
    hideGradientType?: boolean;
    hideGradientAngle?: boolean;
    hideGradientStop?: boolean;
    hideGradientControls?: boolean;
    width?: number;
    height?: number;
    style?: {};
    className?: any;
}): any;
export default ColorPicker;

export interface GradientObject {
    isGradient: boolean,
    gradientType: string,
    degrees: string,
    colors: {value: string, left?: number}[]
}

export interface ColorPickerHook {
    setLinear: () => void,
    setRadial: () => void,
    setDegrees: (deg: number) => void,
    setSolid: (color: string) => void,
    setGradient: (color: string) => void,
    setR: (r: number) => void,
    setG: (g: number) => void,
    setB: (b: number) => void,
    setA: (a: number) => void,
    setHue: (hue: number) => void,
    setSaturation: (saturation: number) => void,
    setLightness: (lightness: number) => void,
    valueToHSL: () => string,
    valueToHSV: () => string,
    valueToHex: () => string,
    valueToCmyk: () => string,
    setSelectedPoint: (index: number) => void,
    addPoint: (left: number) => void,
    deletePoint: (index: number) => void,
    setPointLeft: (left: number) => void,
    rgbaArr: [r: number, g: number, b:number, a: number],
    hslArr: [h: number, s: number, l: number],
    getGradientObject: () => GradientObject
    selectedPoint: number | undefined;
    isGradient: GradientObject["isGradient"];
    gradientType: GradientObject["gradientType"];
    degrees: GradientObject["degrees"];
    currentLeft: number | undefined;
}
export declare function useColorPicker(value: string, onChange: (value: string) => void): ColorPickerHook;
