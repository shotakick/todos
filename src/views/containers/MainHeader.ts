import { connect } from 'react-redux';
import { todosActions } from '../../state/ducks/todos';
import {
  MainHeader as InnerComponent,
  MainHeaderProps as InnerComponentProps,
} from '../components/MainHeader';

type StateProps = {};
type DispatchProps = Pick<InnerComponentProps, 'onInputTodo'>;
type OwnProps = {};

export const MainHeader = connect<StateProps, DispatchProps, OwnProps>(
  null,
  dispatch => ({
    onInputTodo: (title: string) => {
      dispatch(todosActions.addTodo({ title, createdAt: new Date() }));
    },
  }),
)(InnerComponent);
export default MainHeader;
