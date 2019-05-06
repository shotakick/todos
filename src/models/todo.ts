// Types
export type TodoId = number;
export interface Todo {
  id: TodoId;
  title: string;
  isCompleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}
