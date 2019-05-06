import { connect } from 'react-redux';
import { ReduxRootState } from '../../state/ducks';
import {
  MainWindow as InnerComponent,
  MainWindowProps as InnerComponentProps,
} from '../components/MainWindow';

type StateProps = Pick<InnerComponentProps, 'isPrepared'>;
type DispatchProps = {};
type OwnProps = {};

export const DetailWindow = connect<StateProps, DispatchProps, OwnProps, ReduxRootState>(
  state => ({
    isPrepared: !!state.todos.isPrepared,
  }),
  {},
)(InnerComponent);
export default DetailWindow;
