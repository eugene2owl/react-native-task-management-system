import { StyleSheet } from "react-native";
import { Color } from "../../../../assets/color";
import { h } from "../../../../consts/environment";

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    backgroundColor: Color.CARBON,
    height: h / 12
  },
  leftIconOpacity: {
    flex: 1,
    justifyContent: 'center',

    height: '100%',
  },
  text: {
    flex: 5,

    height: '100%',
    paddingHorizontal: 5,
    fontSize: 35,
    color: Color.LIGHT
  },
  rightIconOpacity: {
    flex: 1,
    justifyContent: 'center',

    height: '100%',
  }
})
