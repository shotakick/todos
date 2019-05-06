import { connect } from 'react-redux';
import { ReduxRootState } from '../../state/ducks';
import {
  PrivateRoute as InnerComponent,
  PrivateRouteProps as InnerComponentProps,
} from '../components/PrivateRoute';

type StateProps = Pick<InnerComponentProps, 'isAuthenticated'>;
type DispatchProps = {};
type OwnProps = {};

export const PrivateRoute = connect<StateProps, DispatchProps, OwnProps, ReduxRootState>(
  state => ({
    isAuthenticated: !!state.auth.isAuthed,
  }),
  {},
)(InnerComponent);
export default PrivateRoute;
