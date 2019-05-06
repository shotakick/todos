import { connect } from 'react-redux';
import { todosActions } from '../../state/ducks/todos';
import {
  TodoItem as InnerComponent,
  TodoItemProps as InnerComponentProps,
} from '../components/TodoItem';

type StateProps = {};
type DispatchProps = Pick<InnerComponentProps, 'onToggle' | 'onChange' | 'onDelete'>;
type OwnProps = Pick<InnerComponentProps, 'todo'>;

export const TodoItem = connect<StateProps, DispatchProps, OwnProps>(
  null,
  (dispatch, props) => ({
    onToggle: () => {
      dispatch(todosActions.toggleCompleteTodo({ id: props.todo.id, updatedAt: new Date() }));
    },
    onChange: (newTitle: string) => {
      dispatch(todosActions.setTodo({ id: props.todo.id, title: newTitle, updatedAt: new Date() }));
    },
    onDelete: () => {
      dispatch(todosActions.deleteTodo({ id: props.todo.id }));
    },
  }),
)(InnerComponent);
export default TodoItem;
