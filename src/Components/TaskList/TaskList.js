import Task from '../Task';
import './TaskList.css';
import PropTypes from 'prop-types';


function TaskList({ tasks, onDeleted, onToggleDone }) {
  return (
    <ul className="todo-list">
      {tasks.map(({ id, ...taskProps }) => (
        <li key={id} className='todo-list-item'>
          <Task {...taskProps} 
          onDeleted={() => onDeleted(id)}
          onToggleDone={() => onToggleDone(id)}/>
        </li>
      ))}
    </ul>
  );
}

TaskList.defaultProps = {
  tasks: [],
  onDeleted: () => {},
  onToggleDone: () => {},
};

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.object),
  onDeleted: PropTypes.func,
  onToggleDone: PropTypes.func
};

export default TaskList;