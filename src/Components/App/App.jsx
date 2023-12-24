import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import NewTaskForm from '../NewTaskForm';
import TaskList from '../TaskList';
import Footer from '../Footer';
import './App.scss';

export default function App() {
  const createTodoItem = (text, time, pause = true, isTimerStarted = false, timerType = 'countdown') => {
    const id = uuidv4();
    return {
      id,
      description: text,
      created: new Date(),
      done: false,
      time,
      pause,
      isTimerStarted,
      timerType
    };
  };

  const [tasks, setTasks] = useState([
    createTodoItem('First task', 300, true),
    createTodoItem('Second task', 300, true),
    createTodoItem('Third task', 300, true),
  ]);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    const interval = setInterval(() => {
      setTasks((currentTasks) => currentTasks.map(task => {
        if (!task.pause) {
          if (task.timerType === 'countdown' && task.time > 0) {
            return { ...task, time: task.time - 1 };
          }
          if (task.timerType === 'countup' && task.isTimerStarted) {
            return { ...task, time: task.time + 1 };
          }
        }
        return task;
      }));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const updateTasks = (id, updateFunc) => {
    setTasks((currentTasks) => currentTasks.map(task => (task.id === id ? updateFunc(task) : task)));
  };

  const addItem = (text, time) => {
    const isTimerStarted = time === 0;
    const timerType = time === 0 ? 'countup' : 'countdown';
    const newItem = createTodoItem(text, time, time !== undefined, isTimerStarted, timerType);
    setTasks((currentTasks) => [...currentTasks, newItem]);
  };

  const onToggleDone = (id) => {
    updateTasks(id, task => ({ ...task, done: !task.done }));
  };

  const deleteItem = (id) => {
    setTasks((currentTasks) => currentTasks.filter(task => task.id !== id));
  };

  const toggleTimer = (id) => {
    updateTasks(id, task => ({ ...task, pause: !task.pause }));
  };

  const onFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  const clearCompleted = () => {
    setTasks((currentTasks) => currentTasks.filter(task => !task.done));
  };

  const doneCount = tasks.filter(({ done }) => !done).length;
  const filteredTasks = tasks.filter((task) => {
    if (filter === 'All') return true;
    if (filter === 'Active') return !task.done;
    if (filter === 'Completed') return task.done;
    return true;
  });

  return (
    <section className="todoapp">
      <NewTaskForm onItemAdded={addItem} />
      <section className="main">
        <TaskList
          onToggleDone={onToggleDone}
          onDeleted={deleteItem}
          onToggleTimer={toggleTimer}
          filteredTasks={filteredTasks}
        />
        <Footer
          count={doneCount}
          onFilterChange={onFilterChange}
          clearCompleted={clearCompleted}
        />
      </section>
    </section>
  );
}