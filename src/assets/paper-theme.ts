// @ts-ignore
import color from 'color';
import { DefaultTheme } from "react-native-paper";
import { Color } from "./color";

const appPaperTheme = {
  ...DefaultTheme,
  dark: true,
  roundness: 8,
  colors: {
    ...DefaultTheme.colors,
    primary: Color.OCEAN,
    accent: Color.FRANT,
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
  }
};

export { appPaperTheme }
