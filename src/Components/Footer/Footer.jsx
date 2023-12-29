import PropTypes from 'prop-types';
import TasksFilter from '../TasksFilter';
import './Footer.scss';

export default function Footer({ tasks, setTasks, setFilter }) {
  const count = tasks.filter(({ done }) => !done).length;

  const clearCompleted = () => {
    setTasks((currentTasks) => currentTasks.filter(task => !task.done));
  };
  
  return (
    <footer className="footer">
      <span className="todo-count">{count} items left</span>
      <TasksFilter setFilter={setFilter} />
      <button type="button" className="clear-completed" onClick={clearCompleted}>Clear completed</button>
    </footer>
  );
}

Footer.defaultProps = {
  setFilter: () => {},
  setTasks: () => {},
};

Footer.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.shape({
    done: PropTypes.bool.isRequired,
  })).isRequired,
  setFilter: PropTypes.func,
  setTasks: PropTypes.func
}