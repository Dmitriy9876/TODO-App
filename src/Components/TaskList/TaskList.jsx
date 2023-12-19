import PropTypes from 'prop-types';
import Task from '../Task';
import './TaskList.css';

export default function TaskList({ filteredTasks, onDeleted, onToggleDone, onToggleTimer }) {
  return (
    <ul className="todo-list">
      {filteredTasks.map(({ id, ...taskProps }) => (
        <li key={id} className='todo-list-item'>
          <Task 
            {...taskProps}
            onDeleted={() => onDeleted(id)}
            onToggleDone={() => onToggleDone(id)}
            onToggleTimer={() => onToggleTimer(id)}
          />
        </li>
      ))}
    </ul>
  );
}

TaskList.defaultProps = {
  filteredTasks: [],
  onDeleted: () => {},
  onToggleDone: () => {},
  handleKeyDown: () => {},
};

TaskList.propTypes = {
  filteredTasks: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    created: PropTypes.instanceOf(Date).isRequired,
    done: PropTypes.bool.isRequired
  })),
  onDeleted: PropTypes.func,
  onToggleDone: PropTypes.func,
  handleKeyDown: PropTypes.func
}