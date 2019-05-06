import React from 'react';
import TitleEditor from './TitleEditor';

export interface MainHeaderProps {
  onInputTodo: (text: string) => void;
}

export const MainHeader: React.FC<MainHeaderProps> = props => {
  const { onInputTodo } = props;
  const handleSubmit = React.useCallback(
    (newTodo: string) => {
      newTodo && onInputTodo(newTodo);
    },
    [onInputTodo],
  );

  return (
    <header className="header">
      <TitleEditor
        className="new-todo"
        placeholder="What needs to be done?"
        value={''}
        onOK={handleSubmit}
        isResetOnOut={true}
        autoFocus={true}
      />
    </header>
  );
};
export default MainHeader;
