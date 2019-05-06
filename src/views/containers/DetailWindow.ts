import { connect } from 'react-redux';
import { ReduxRootState } from '../../state/ducks';
import { getTodoAtDetailPath } from '../../state/selectors';
import {
  DetailWindow as InnerComponent,
  DetailWindowProps as InnerComponentProps,
} from '../components/DetailWindow';

type StateProps = Pick<InnerComponentProps, 'todo' | 'isPrepared'>;
type DispatchProps = {};
type OwnProps = {};

export const DetailWindow = connect<StateProps, DispatchProps, OwnProps, ReduxRootState>(
  state => ({
    todo: getTodoAtDetailPath(state),
    isPrepared: !!state.todos.isPrepared,
  }),
  {},
)(InnerComponent);
export default DetailWindow;
