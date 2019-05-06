import React from 'react';
import { Todo } from '../../models/todo';
import TodoItem from '../containers/TodoItem';

export interface TodoListProps {
  todoList: Todo[];
}

export const TodoList: React.FC<TodoListProps> = props => {
  return (
    <ul className="todo-list">
      {props.todoList.map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
};
export default TodoList;
