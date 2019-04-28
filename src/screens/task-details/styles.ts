import { StyleSheet } from "react-native";
import { Color } from "../../assets/color";
import { Font } from "../../assets/fonts/font";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.ENSIGN
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingTop: 20
  },
  baseInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  nameLabel: {
    fontSize: 35
  },
  dateCreatedInfoContainer: {
  },
  dateCreatedLabel: {
    fontSize: 20
  },
  statusInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 25
  },
  statusLabel: {
    fontSize: 25,
    color: Color.OCEAN
  },
  deadlineLabel: {
    fontSize: 20,
    color: Color.SUN
  },
  userChipsInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10
  },
  chipContainer: {
    alignItems: 'center',
    paddingHorizontal: 3
  },
  userChip: {

  },
  parentChipContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingVertical: 10
  },
  parentChip: {

  },
  childrenChipContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingVertical: 10
  },
  childChip: {
  },
  descriptionContainer: {
    paddingVertical: 10
  },
  description: {
    fontSize: 18,
    paddingVertical: 5
  }
});
