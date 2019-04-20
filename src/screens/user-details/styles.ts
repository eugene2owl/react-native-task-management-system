import { StyleSheet } from "react-native";
import { Color } from "../../assets/color";
import { Font } from "../../assets/fonts/font";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.ENSIGN
  },
  detailsContainer: {
    flex: 1,
    paddingTop: 8
  },
  baseDetailsZone: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start'
  },
  avatarContainer: {
    flexDirection: 'row',
    padding: 18
  },
  descriptionContainer: {
    flex: 1
  },
  usernameLabel: {
    fontSize: 35
  },
  roleLabel: {
    fontSize: 25,
    color: Color.SUN,
    marginVertical: 2
  },
  timeLoggedLabel: {
    fontSize: 20
  },
  teamsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingVertical: 2
  },
  teamChip: {
    maxWidth: 100,
    marginVertical: 4
  }
});
