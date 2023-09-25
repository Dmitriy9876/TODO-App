import PropTypes from 'prop-types';
import Task from '../Task';
import './TaskList.css';



function TaskList({ tasks, onDeleted, onToggleDone, handleKeyDown  }) {
  return (
    <ul className="todo-list">
      {tasks.map(({ id, ...taskProps }) => (
        <li key={id} className='todo-list-item'>
          <Task 
            description={taskProps.description} 
            created={taskProps.created} 
            done={taskProps.done}
            onDeleted={() => onDeleted(id)}
            onToggleDone={() => onToggleDone(id)}
            handleKeyDown={handleKeyDown(() => onToggleDone(id))}/>
        </li>
      ))}
    </ul>
  );
}

TaskList.defaultProps = {
  tasks: [],
  onDeleted: () => {},
  onToggleDone: () => {},
  handleKeyDown: () => {},
};

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    created: PropTypes.instanceOf(Date).isRequired,
    done: PropTypes.bool.isRequired
  })),
  onDeleted: PropTypes.func,
  onToggleDone: PropTypes.func,
  handleKeyDown: PropTypes.func
};

export default TaskList;