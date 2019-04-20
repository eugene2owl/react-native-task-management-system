export class TaskStatus {

  static readonly value = {
    TO_PERFORM: { id: 1, label: 'To Do', icon: 'description' },
    IN_PROGRESS: { id: 2, label: 'In Progress', icon: 'developer-board' },
    READY_FOR_VERIFICATION: { id: 3, label: 'Ready For Verification', icon: 'gamepad' },
    VERIFICATION_APPROVED: { id: 4, label: 'Verification Approved', icon: 'done' },
    DONE: { id: 5, label: 'Done', icon: 'done-all' },
    FROZEN: { id: 6, label: 'Frozen', icon: 'waves' },
    DENIED: { id: 7, label: 'Denied', icon: 'whatshot' }
  };
}
