import { useState } from 'react';
import './TasksFilter.scss';
import PropTypes from 'prop-types';

export default function TasksFilter({ setFilter }) {
  const [activeFilter, setActiveFilter] = useState('All');

  const onFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
    onFilterChange(filter);
  };

  return (
    <ul className="filters">
      <li>
        <button
          type="button"
          className={activeFilter === 'All' ? 'active' : ''}
          onClick={() => handleFilterChange('All')}
        >
          All
        </button>
      </li>
      <li>
        <button
          type="button"
          className={activeFilter === 'Active' ? 'active' : ''}
          onClick={() => handleFilterChange('Active')}
        >
          Active
        </button>
      </li>
      <li>
        <button
          type="button"
          className={activeFilter === 'Completed' ? 'active' : ''}
          onClick={() => handleFilterChange('Completed')}
        >
          Completed
        </button>
      </li>
    </ul>
  );
}

TasksFilter.defaultProps = {
  setFilter: () => {}
};

TasksFilter.propTypes = {
  setFilter: PropTypes.func
}