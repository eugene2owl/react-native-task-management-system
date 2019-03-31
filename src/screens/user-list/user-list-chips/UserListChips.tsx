import styles from './styles';
import { View } from "react-native";
import * as React from "react";
import { Chip } from "react-native-paper";
import { TaskStatus } from "../../../lib/models/task/task-status";
import { appPaperTheme } from "../../../assets/paper-theme";
import { Color } from "../../../assets/color";

interface Props {
  tasksToPerform: number;
  tasksInProgress: number;
}

function buildChipLabel(count: number, status: string): string {
  return count + ' ' + status;
}

const UserListChips = (props: Props) => {
  const chipTheme = JSON.parse(JSON.stringify(appPaperTheme));
  chipTheme.colors.text = Color.SUN;

  const { tasksToPerform, tasksInProgress } = props;

  return (
    <View style={ styles.container }>
      { !!tasksToPerform &&
      <Chip style={ [styles.toPerformChip, styles.chip] } theme={ chipTheme }>
        { buildChipLabel(tasksToPerform, TaskStatus.value.TO_PERFORM.label) }
      </Chip>
      }
      { !!tasksInProgress &&
      <Chip style={ [styles.inProgressChip, styles.chip] } theme={ chipTheme }>
        { buildChipLabel(tasksInProgress, TaskStatus.value.IN_PROGRESS.label) }
      </Chip>
      }
    </View>
  )
};

export { UserListChips }
