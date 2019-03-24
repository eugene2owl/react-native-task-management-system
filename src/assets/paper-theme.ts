// @ts-ignore
import color from 'color';
import { DefaultTheme } from "react-native-paper";
import { Color } from "./color";
import { Font } from "./fonts/font";

const appPaperTheme = {
  ...DefaultTheme,
  dark: true,
  roundness: 8,
  colors: {
    ...DefaultTheme.colors,
    primary: Color.OCEAN,
    accent: Color.SUN,
    background: Color.ENSIGN,
    surface: Color.ASPHALT,
    error: Color.BLOOD,
    text: Color.LIGHT,
    disabled: color(Color.LIGHT)
      .alpha(0.26)
      .rgb()
      .string(),
    placeholder: color(Color.LIGHT)
      .alpha(0.54)
      .rgb()
      .string(),
    backdrop: color(Color.LIGHT)
      .alpha(0.5)
      .rgb()
      .string()
  },
  fonts: {
    ...DefaultTheme.fonts,
    regular: Font.SNIGLET,
    medium: Font.SNIGLET,
    light: Font.SNIGLET,
    thin: Font.SNIGLET,
  }
};

export { appPaperTheme }
