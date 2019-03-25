import { StyleSheet } from "react-native";
import { Color } from "../../../../assets/color";
import { Font } from "../../../../assets/fonts/font";

export default StyleSheet.create({
  container: {
    marginVertical: 7,
    backgroundColor: Color.ASPHALT,
    padding: 5,
    borderRadius: 15
  },
  picker: {
    width: '100%',
    height: 55,
    backgroundColor: Color.ASPHALT,
    color: Color.SUN,
    fontFamily: Font.SNIGLET
  }
})
