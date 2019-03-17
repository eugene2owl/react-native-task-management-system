import { StyleSheet } from "react-native";
import { Color } from "../../../../assets/color";
import { h } from "../../../../consts/environment";
import { Font } from "../../../../assets/fonts/font";

export default StyleSheet.create({
  container: {
    flexDirection: 'row',

    backgroundColor: Color.CARBON,
    height: h / 12,

    marginBottom: 50,

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
