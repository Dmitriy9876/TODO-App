import './TasksFilter.css';
import PropTypes from 'prop-types';

export default function TasksFilter({ onFilterChange }) {
  return (
    <ul className="filters">
      <li>
        <button type="button" onClick={() => onFilterChange('All')}>All</button>
      </li>
      <li>
        <button type="button" onClick={() => onFilterChange('Active')}>Active</button>
      </li>
      <li>
        <button type="button" onClick={() => onFilterChange('Completed')}>Completed</button>
      </li>
    </ul>
  );
}

TasksFilter.defaultProps = {
  onFilterChange: () => {}
};

TasksFilter.propTypes = {
  onFilterChange: PropTypes.func
}