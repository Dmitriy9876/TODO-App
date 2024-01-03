import { useState } from 'react';
import PropTypes from 'prop-types';
import Task from '../Task';
import './TaskList.scss';

export default function TaskList({ setTasks, filter, tasks }) {
  const [editingId, setEditingId] = useState(null);

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'Active') return !task.done;
    if (filter === 'Completed') return task.done;
    return true;
  });

  return (
    <ul className="todo-list">
      {filteredTasks.map((task) => (
        <li key={task.id} className='todo-list-item'>
          <Task
            id={task.id}
            description={task.description}
            created={task.created}
            done={task.done}
            time={task.time}
            pause={task.pause}
            isTimerStarted={task.isTimerStarted}
            timerType={task.timerType}
            setTasks={setTasks}
            isEditing={task.id === editingId}
            startEditing={() => setEditingId(task.id)}
            stopEditing={() => setEditingId(null)}
          />
        </li>
      ))}
    </ul>
  );
}

TaskList.propTypes = {
  filter: PropTypes.oneOf(['All', 'Active', 'Completed']).isRequired,
  tasks: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    created: PropTypes.instanceOf(Date).isRequired,
    done: PropTypes.bool.isRequired,
    time: PropTypes.number.isRequired,
    pause: PropTypes.bool.isRequired,
    isTimerStarted: PropTypes.bool,
    timerType: PropTypes.string
  })).isRequired,
  setTasks: PropTypes.func.isRequired
}