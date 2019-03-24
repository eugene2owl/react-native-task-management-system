import { StyleSheet } from "react-native";
import { Color } from "../../../assets/color";
import { Font } from "../../../assets/fonts/font";

export default StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 0
  },
  fullScreen: {
    height: '100%'
  },
  activityIndicator: {
  },
  messageContainer: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center'
  },
  messageText: {
    fontSize: 15,
    color: Color.LIGHT,
    fontFamily: Font.SNIGLET
  }
})
