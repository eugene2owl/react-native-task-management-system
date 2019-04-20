import { StyleSheet } from "react-native";
import { Color } from "../../assets/color";
import { Font } from "../../assets/fonts/font";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.ENSIGN
  },
  filterPanel: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    paddingTop: 5
  },
  formPickerControlContainer: {
    width: '55%'
  },
  switchContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    paddingLeft: 40
  },
  switchLabel: {
    fontSize: 16,
    color: Color.OCEAN
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
  listItemRightTextDeadline: {
    color: Color.SUN
  },
  listItemRightTextDeadlineExpired: {
    color: Color.BLOOD
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  }
});
