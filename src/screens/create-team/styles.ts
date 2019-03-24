import { StyleSheet } from "react-native";
import { Color } from "../../assets/color";
import { ScreenParameter } from "../../consts/ScreenParameter";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.ENSIGN
  },
  scrollContainer: {
    flex: 1,
    width: '100%'
  },
  scrollContainerContent: {
    alignItems: 'center'
  },
  contentContainer: {
    flex: 1,
    width: ScreenParameter.WIDTH * 0.90
  },
  formContainer: {
  },
  logoContainer: {
    alignItems: 'center'
  },
  nameControl: {
  },
  leaderControl: {
    marginVertical: 10
  },
  candidatesControlList: {
  },
  candidatesControlListScroll: {
    height: 200
  },
  candidatesControlListScrollContent: {
    marginLeft: -60
  },
  candidatesControlListItem: {
    height: 60
  },
  candidatesControlListItemLeft: {
  },
  candidatesControlListItemRight: {
    alignItems: 'center',
    paddingTop: 5
  },
  submitButton: {
    marginVertical: 10
  }
})
