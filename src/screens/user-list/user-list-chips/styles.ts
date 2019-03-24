import { StyleSheet } from "react-native";
import { Color } from "../../../assets/color";

export default StyleSheet.create({
  container: {
    flex: 1,
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginLeft: -140
  },
  chip: {
    width: 110,
    marginHorizontal: 2,
    backgroundColor: Color.ASPHALT
  },
  toPerformChip: {
    color: Color.SUN
  },
  inProgressChip: {
  }
});
