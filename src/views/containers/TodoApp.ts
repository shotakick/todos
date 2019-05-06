import { connect } from 'react-redux';
import { ReduxRootState } from '../../state/ducks';
import { authActions } from '../../state/ducks/auth';
import {
  TodoApp as InnerComponent,
  TodoAppProps as InnerComponentProps,
} from '../components/TodoApp';

type StateProps = Pick<InnerComponentProps, 'isAuthPrepared'>;
type DispatchProps = Pick<InnerComponentProps, 'authenticate'>;
type OwnProps = {};

export const TodoApp = connect<StateProps, DispatchProps, OwnProps, ReduxRootState>(
  state => ({
    isAuthPrepared: !!state.auth.isPrepared,
  }),
  dispatch => ({
    authenticate: () => dispatch(authActions.authenticate()),
  }),
)(InnerComponent);
export default TodoApp;
