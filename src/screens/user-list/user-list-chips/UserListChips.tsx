import styles from './styles';
import { View } from "react-native";
import * as React from "react";
import { Chip } from "react-native-paper";
import { TaskStatus } from "../../../lib/models/task/task-status";

interface Props {
  tasksToPerform: number;
  tasksInProgress: number;
}

function buildChipLabel(count: number, status: string): string {
  return count + ' ' + status;
}

const UserListChips = (props: Props) => {
  const { tasksToPerform, tasksInProgress } = props;

  return (
    <View style={ styles.container }>
      { !!tasksToPerform &&
        <Chip style={ [styles.toPerformChip, styles.chip] }>
          { buildChipLabel(tasksToPerform, TaskStatus.TO_PERFORM) }
        </Chip>
      }
      { !!tasksInProgress &&
        <Chip style={ [styles.inProgressChip, styles.chip] }>
          { buildChipLabel(tasksInProgress, TaskStatus.IN_PROGRESS) }
        </Chip>
      }
    </View>
  )
};

export { UserListChips }
