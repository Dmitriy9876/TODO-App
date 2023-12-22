import React, { Component } from 'react';
import './TasksFilter.scss';
import PropTypes from 'prop-types';

export default class TasksFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeFilter: 'All'
    };
  }

  handleFilterChange = (filter) => {
    const { onFilterChange } = this.props; // Деструктуризация здесь
    this.setState({ activeFilter: filter });
    onFilterChange(filter);
  }

  render() {
    const { activeFilter } = this.state;

    return (
      <ul className="filters">
        <li>
          <button
            type="button"
            className={activeFilter === 'All' ? 'active' : ''}
            onClick={() => this.handleFilterChange('All')}
          >
            All
          </button>
        </li>
        <li>
          <button
            type="button"
            className={activeFilter === 'Active' ? 'active' : ''}
            onClick={() => this.handleFilterChange('Active')}
          >
            Active
          </button>
        </li>
        <li>
          <button
            type="button"
            className={activeFilter === 'Completed' ? 'active' : ''}
            onClick={() => this.handleFilterChange('Completed')}
          >
            Completed
          </button>
        </li>
      </ul>
    );
  }
}

TasksFilter.defaultProps = {
  onFilterChange: () => {}
};

TasksFilter.propTypes = {
  onFilterChange: PropTypes.func
};