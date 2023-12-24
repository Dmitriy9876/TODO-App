import PropTypes from 'prop-types';
import Task from '../Task';
import './TaskList.scss';

export default function TaskList({ onToggleDone, onDeleted, onToggleTimer, filteredTasks }) {
  return (
    <ul className="todo-list">
      {filteredTasks.map(({ id, description, created, done, time, pause }) => (
        <li key={id} className='todo-list-item'>
          <Task
            time={time}
            pause={pause}
            description={description}
            created={created}
            done={done}
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
  onToggleTimer: () => {},
};

TaskList.propTypes = {
  filteredTasks: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    created: PropTypes.instanceOf(Date).isRequired,
    done: PropTypes.bool.isRequired,
    time: PropTypes.number.isRequired,
    pause: PropTypes.bool.isRequired
  })),
  onDeleted: PropTypes.func,
  onToggleDone: PropTypes.func,
  onToggleTimer: PropTypes.func,
}