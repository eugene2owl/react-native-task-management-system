import { StyleSheet } from "react-native";
import { Color } from "../../../../assets/color";
import { ScreenParameter } from "../../../../consts/ScreenParameter";

export default StyleSheet.create({
  container: {
    flexDirection: 'row',

    backgroundColor: Color.ASPHALT,
    height: ScreenParameter.HEIGHT / 12,

    // shadow
    shadowColor: Color.CARBON,
    elevation: 4
  },
  searchBarContainer: {
    flex: 6
  },
  closeIconOpacity: {
    flex: 1,
    justifyContent: 'center'
  }
})
