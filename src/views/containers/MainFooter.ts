import { connect } from 'react-redux';
import { ReduxRootState } from '../../state/ducks';
import { getActiveTodoList, getCompletedTodoList, todosActions } from '../../state/ducks/todos';
import {
  MainFooter as InnerComponent,
  MainFooterProps as InnerComponentProps,
} from '../components/MainFooter';

type StateProps = Pick<InnerComponentProps, 'activeCount' | 'completedCount'>;
type DispatchProps = Pick<InnerComponentProps, 'handleClearCompleted'>;
type OwnProps = {};

export const MainFooter = connect<StateProps, DispatchProps, OwnProps, ReduxRootState>(
  state => ({
    activeCount: getActiveTodoList(state).length,
    completedCount: getCompletedTodoList(state).length,
  }),
  dispatch => ({
    handleClearCompleted: () => dispatch(todosActions.clearCompleted()),
  }),
)(InnerComponent);
export default MainFooter;
