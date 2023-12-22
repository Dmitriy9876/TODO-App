import PropTypes from 'prop-types';
import TasksFilter from '../TasksFilter';
import './Footer.scss';

export default function Footer({ count, onFilterChange, clearCompleted }) {
  return (
    <footer className="footer">
      <span className="todo-count">{count} items left</span>
      <TasksFilter onFilterChange={onFilterChange} />
      <button type="button" className="clear-completed" onClick={clearCompleted}>Clear completed</button>
    </footer>
  );
}

Footer.defaultProps = {
  count: 0,
  onFilterChange: () => {},
  clearCompleted: () => {},
};

Footer.propTypes = {
  count: PropTypes.number,
  onFilterChange: PropTypes.func,
  clearCompleted: PropTypes.func
};