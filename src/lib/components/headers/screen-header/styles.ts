import { StyleSheet } from "react-native";
import { Color } from "../../../../assets/color";
import { Font } from "../../../../assets/fonts/font";
import { ScreenParameter } from "../../../../consts/ScreenParameter";

export default StyleSheet.create({
  container: {
    flexDirection: 'row',

    backgroundColor: Color.CARBON,
    height: ScreenParameter.HEIGHT / 12,

    // shadow
    shadowColor: Color.CARBON,
    elevation: 4,
  },
  leftIconOpacity: {
    flex: 1,
    justifyContent: 'center',

    height: '100%'
  },
  textContainer: {
    flex: 5,
    justifyContent: 'center',

    height: '100%',
    paddingHorizontal: 5
  },
  text: {
    fontSize: 35,
    color: Color.LIGHT,
    fontFamily: Font.SNIGLET,
  },
  rightIconOpacity: {
    flex: 1,
    justifyContent: 'center',

    height: '100%',
  }
})
