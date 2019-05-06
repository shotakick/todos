import React from 'react';
import { NavLink } from 'react-router-dom';
import { Path } from '../../routes';

export interface MainFooterProps {
  activeCount: number;
  completedCount: number;
  handleClearCompleted: () => void;
}

export const MainFooter: React.FC<MainFooterProps> = props => {
  const isShowFooter = props.activeCount || props.completedCount;

  return (
    <footer className="footer" hidden={!isShowFooter}>
      <span className="todo-count">
        <strong>{props.activeCount}</strong> {props.activeCount === 1 ? 'item' : 'items'} left
      </span>
      <ul className="filters">
        <li>
          <NavLink exact={true} activeClassName="selected" to={Path.showAll}>
            All
          </NavLink>
        </li>{' '}
        <li>
          <NavLink exact={true} activeClassName="selected" to={Path.showActive}>
            Active
          </NavLink>
        </li>{' '}
        <li>
          <NavLink exact={true} activeClassName="selected" to={Path.showCompleted}>
            Completed
          </NavLink>
        </li>
      </ul>
      <button
        hidden={!props.completedCount}
        className="clear-completed"
        onClick={props.handleClearCompleted}
      >
        Clear completed
      </button>
    </footer>
  );
};
export default MainFooter;
