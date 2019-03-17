import { StyleSheet } from "react-native";
import { Color } from "../../assets/color";
import { ScreenParameter } from "../../consts/ScreenParameter";

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Color.ENSIGN
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    width: ScreenParameter.WIDTH * 0.75
  },
  logoContainer: {
    alignItems: 'center'
  },
  formContainer: {
    justifyContent: 'center',
  },
  usernameControl: {

  },
  passwordControl: {
    marginVertical: 10
  },
  submitButton: {

  }
})
