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

  return (
    <section className="todoapp">
      <NewTaskForm setTasks={setTasks} createTodoItem={createTodoItem} />
      <section className="main">
        <TaskList
          tasks={tasks}
          setTasks={setTasks}
          filter={filter}
        />
        <Footer
          tasks={tasks}
          setTasks={setTasks}
          setFilter={setFilter}
        />
      </section>
    </section>
  );
}