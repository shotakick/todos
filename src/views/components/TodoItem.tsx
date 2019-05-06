import classNames from 'classnames';
import React, { useCallback, useState } from 'react';
import { generatePath, Link } from 'react-router-dom';
import { Todo } from '../../models/todo';
import { Path } from '../../routes';
import TitleEditor from './TitleEditor';

export interface TodoItemProps {
  todo: Todo;
  onToggle: () => void;
  onDelete: () => void;
  onChange: (newTitle: string) => void;
}

export const TodoItem: React.FC<TodoItemProps> = props => {
  const { id, title, isCompleted } = props.todo;
  const { onToggle, onDelete, onChange } = props;

  const [isEditing, setEditing] = useState(false);

  const openEditor = useCallback(() => setEditing(true), []);
  const closeEditor = useCallback(() => setEditing(false), []);

  const handleEditOK = useCallback(
    (title: string) => {
      closeEditor();
      title ? onChange(title) : onDelete();
    },
    [onChange, onDelete, closeEditor],
  );

  return (
    <li
      className={classNames({
        completed: isCompleted,
        editing: isEditing,
      })}
    >
      <div className="view">
        <input className="toggle" type="checkbox" checked={isCompleted} onChange={onToggle} />
        <label onDoubleClick={openEditor}>
          <Link to={generatePath(Path.detail, { id })}>{title}</Link>
        </label>
        <button className="destroy" onClick={onDelete} />
      </div>
      {isEditing && (
        <TitleEditor
          className="edit"
          value={title}
          onOK={handleEditOK}
          onCancel={closeEditor}
          behaviorOnBlur="onOK"
          autoFocus={true}
        />
      )}
    </li>
  );
};
export default TodoItem;
