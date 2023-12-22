import { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';
import NewTaskForm from '../NewTaskForm';
import TaskList from '../TaskList';
import Footer from '../Footer';
import './App.scss';

export default class App extends Component {
  static createTodoItem(text, time, pause = true, isTimerStarted = false, timerType = 'countdown') {
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
  }

  constructor(props) {
    super(props);
    this.state = {
      tasks: [
        App.createTodoItem('First task', 300, true),
        App.createTodoItem('Second task', 300, true),
        App.createTodoItem('Third task', 300, true),
      ],
      filter: 'All',
    };

    this.interval = setInterval(() => {
      this.setState(({ tasks }) => {
        const updatedTasks = tasks.map(task => {
          if (!task.pause) {
            if (task.timerType === 'countdown' && task.time > 0) {
              return { ...task, time: task.time - 1 };
            }
            if (task.timerType === 'countup' && task.isTimerStarted) {
              return { ...task, time: task.time + 1 };
            }
          }
          return task;
        });
        return { tasks: updatedTasks };
      });
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  updateTasks = (id, updateFunc) => {
    this.setState(({ tasks }) => ({
      tasks: tasks.map(task => (task.id === id ? updateFunc(task) : task))
    }));
  };

  addItem = (text, time) => {
    const isTimerStarted = time === 0;
    const timerType = time === 0 ? 'countup' : 'countdown';
    const newItem = App.createTodoItem(text, time, time !== undefined, isTimerStarted, timerType);
    this.setState(({ tasks }) => ({
      tasks: [...tasks, newItem]
    }));
  };

  onToggleDone = (id) => {
    this.updateTasks(id, task => ({ ...task, done: !task.done }));
  };

  deleteItem = (id) => {
    this.setState(({ tasks }) => ({
      tasks: tasks.filter(task => task.id !== id)
    }));
  };

  toggleTimer = (id) => {
    this.updateTasks(id, task => ({ ...task, pause: !task.pause }));
  };

  onFilterChange = (filter) => {
    this.setState({ filter });
  };

  clearCompleted = () => {
    this.setState(({ tasks }) => ({
      tasks: tasks.filter(task => !task.done)
    }));
  };

  render() {
    const { tasks, filter } = this.state;
    const doneCount = tasks.filter(({ done }) => !done).length;
    const filteredTasks = tasks.filter((task) => {
      if (filter === 'All') return true;
      if (filter === 'Active') return !task.done;
      if (filter === 'Completed') return task.done;
      return true;
    });

    return (
      <section className="todoapp">
        <NewTaskForm onItemAdded={this.addItem} />
        <section className="main">
          <TaskList
            onToggleDone={this.onToggleDone}
            onDeleted={this.deleteItem}
            onToggleTimer={this.toggleTimer}
            filteredTasks={filteredTasks}
          />
          <Footer
            count={doneCount}
            onFilterChange={this.onFilterChange}
            clearCompleted={this.clearCompleted}
          />
        </section>
      </section>
    );
  }
}