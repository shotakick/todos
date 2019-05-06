import React from 'react';
import TodoList from '../containers/TodoList';

export interface MainContentsProps {
  todoCount: number;
  activeTodoCount: number;
  handleToggleAll: () => void;
}

export const MainContents: React.FC<MainContentsProps> = props => {
  const { todoCount, activeTodoCount, handleToggleAll } = props;

  return (
    <section className="main" hidden={todoCount === 0}>
      <input
        id="toggle-all"
        className="toggle-all"
        type="checkbox"
        onChange={handleToggleAll}
        checked={!activeTodoCount}
      />
      <label htmlFor="toggle-all">Mark all as complete</label>
      <TodoList />
    </section>
  );
};
export default MainContents;
