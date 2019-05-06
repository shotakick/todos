import { connect } from 'react-redux';
import { ReduxRootState } from '../../state/ducks';
import { authActions } from '../../state/ducks/auth';
import {
  LoginWindow as InnerComponent,
  LoginWindowProps as InnerComponentProps,
} from '../components/LoginWindow';

type StateProps = Pick<InnerComponentProps, 'isAuthed'>;
type DispatchProps = Pick<InnerComponentProps, 'onLoggedIn'>;
type OwnProps = {};

export const MainContents = connect<StateProps, DispatchProps, OwnProps, ReduxRootState>(
  state => ({
    isAuthed: !!state.auth.isAuthed,
  }),
  dispatch => ({
    onLoggedIn: (id: string) => {
      dispatch(authActions.asyncAuth.done({ params: {}, result: { id } }));
    },
  }),
)(InnerComponent);
export default MainContents;
