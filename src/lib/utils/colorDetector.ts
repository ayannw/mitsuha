//@ts-nocheck

import convert from 'color-convert';
import validate from 'validate-color';

const {
  validateHTMLColorHex,
  validateHTMLColorRgb,
  validateHTMLColorHsl,
  validateHTMLColorName,
} = validate;

interface DetectedColor {
  cType: string;
  converted: {
    hex?: string;
    rgb?: string[];
    hsl?: string[];
    name?: string;
  };
}

export const colorDetector = (text: string): DetectedColor | null => {
  if (validateHTMLColorName(text))
    return {
      cType: 'name',
      converted: {
        hex: convert.keyword.hex(text),
        hsl: convert.keyword.hsl(text),
        rgb: convert.keyword.rgb(text),
        name: text,
      },
    };
  else if (validateHTMLColorHex(text))
    return {
      cType: 'hex',
      converted: {
        hsl: convert.hex.hsl(text),
        rgb: convert.hex.rgb(text),
        name: convert.hex.keyword(text),
        hex: text,
      },
    };
  else if (validateHTMLColorRgb(text))
    return {
      cType: 'rgb',
      converted: {
        hex: convert.rgb.hex(text),
        hsl: convert.rgb.hsl(text),
        name: convert.rgb.keyword(text),
        rgb: [text],
      },
    };
  else if (validateHTMLColorHsl(text))
    return {
      cType: 'hsl',
      converted: {
        hex: convert.hsl.hex(text),
        rgb: convert.hsl.rgb(text),
        name: convert.hsl.keyword(text),
        hsl: [text],
      },
    };
  else return null;
};
