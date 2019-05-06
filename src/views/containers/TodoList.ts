import { connect } from 'react-redux';
import { ReduxRootState } from '../../state/ducks';
import { getVisibleTodosAtPath } from '../../state/selectors';
import {
  TodoList as InnerComponent,
  TodoListProps as InnerComponentProps,
} from '../components/TodoList';

type StateProps = Pick<InnerComponentProps, 'todoList'>;
type DispatchProps = {};
type OwnProps = {};

export const TodoList = connect<StateProps, DispatchProps, OwnProps, ReduxRootState>(
  state => ({ todoList: getVisibleTodosAtPath(state) }),
  {},
)(InnerComponent);
export default TodoList;
