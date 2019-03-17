import { StyleSheet } from "react-native";
import { Color } from "../../../../assets/color";
import { h } from "../../../../consts/environment";

export default StyleSheet.create({
  container: {
    flexDirection: 'row',

    backgroundColor: Color.ASPHALT,
    height: h / 12,
    marginBottom: 100, // TODO remove

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
