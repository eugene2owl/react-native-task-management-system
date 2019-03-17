import { Dimensions } from "react-native";

const window = Dimensions.get('window');

export enum ScreenParameter {
  WIDTH = window.width,
  HEIGHT =  window.height
}
