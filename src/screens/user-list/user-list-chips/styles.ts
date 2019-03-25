import { StyleSheet } from "react-native";
import { Color } from "../../../assets/color";

export default StyleSheet.create({
  container: {
    flex: 1,
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginLeft: -95
  },
  chip: {
    marginHorizontal: 2,
    backgroundColor: Color.ASPHALT
  },
  toPerformChip: {
    width: 80,
    color: Color.SUN
  },
  inProgressChip: {
    width: 110,
  }
});
