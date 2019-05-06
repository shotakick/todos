import { connect } from 'react-redux';
import { ReduxRootState } from '../../state/ducks';
import { getActiveTodoList, getTodoList, todosActions } from '../../state/ducks/todos';
import {
  MainContents as InnerComponent,
  MainContentsProps as InnerComponentProps,
} from '../components/MainContents';

type StateProps = Pick<InnerComponentProps, 'todoCount' | 'activeTodoCount'>;
type DispatchProps = Pick<InnerComponentProps, 'handleToggleAll'>;
type OwnProps = {};

export const MainContents = connect<StateProps, DispatchProps, OwnProps, ReduxRootState>(
  state => ({
    todoCount: getTodoList(state).length,
    activeTodoCount: getActiveTodoList(state).length,
  }),
  dispatch => ({
    handleToggleAll: () => dispatch(todosActions.toggleCompleteAll({ updatedAt: new Date() })),
  }),
)(InnerComponent);
export default MainContents;
