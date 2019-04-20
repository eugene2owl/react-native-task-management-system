import { StyleSheet } from "react-native";
import { Color } from "../../assets/color";

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
    alignItems: 'flex-end',
    paddingRight: 10,
    paddingTop: 10
  },
  listItemRightTextStatus: {
    color: Color.OCEAN
  },
  listItemRightDescription: {
    color: Color.SUN
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  }
});
