export class TaskStatus {

  static readonly value = {
    TO_PERFORM: { id: 1, label: 'To Do' },
    IN_PROGRESS: { id: 2, label: 'In Progress' },
    READY_FOR_VERIFICATION: { id: 3, label: 'Ready For Verification' },
    VERIFICATION_APPROVED: { id: 4, label: 'Verification Approved' },
    DONE: { id: 5, label: 'Done' },
    FROZEN: { id: 6, label: 'Frozen' },
    DENIED: { id: 7, label: 'Denied' }
  };
}
