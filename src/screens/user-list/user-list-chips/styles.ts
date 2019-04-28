import { StyleSheet } from "react-native";
import { Color } from "../../../assets/color";

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginLeft: -115
  },
  chip: {
    height: 32,
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
