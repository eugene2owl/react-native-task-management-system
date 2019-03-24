import { StyleSheet } from "react-native";
import { Color } from "../../assets/color";
import { Font } from "../../assets/fonts/font";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.ENSIGN
  },
  scrollContainer: {

  },
  scrollContainerContent: {

  },
  contentContainer: {

  },
  listItem: {
    height: 60
  },
  listItemRight: {
    paddingRight: 30,
    paddingTop: 10
  },
  listItemRightText: {
    fontFamily: Font.SNIGLET,
    color: Color.SUN
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  }
});
