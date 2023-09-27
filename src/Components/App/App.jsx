import { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';
import NewTaskForm from '../NewTaskForm';
import TaskList from '../TaskList';
import Footer from '../Footer';
import './App.css';

export default class App extends Component {

  static handleKeyDown(onToggleDone) {
    return (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        onToggleDone();
      }
    };
  }

  static createTodoItem(text) {
    const id = uuidv4();
    return {
      id,
      description: text,
      created: new Date(),
      done: false,
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      tasks: [
        App.createTodoItem('Completed task'),
        App.createTodoItem('Editing task'),
        App.createTodoItem('Active task')
      ],
      filter: 'All'
    };
  }

  addItem = (text) => {
    const newItem = App.createTodoItem(text);
    this.setState(({ tasks }) => {
      const newArr = [...tasks, newItem];
      return {
        tasks: newArr,
      };
    });
  };

  onToggleDone = (id) => {
    this.setState(({ tasks }) => {
      const newArray = tasks.map((task) => {
        if (task.id === id) {
          return { ...task, done: !task.done };
        }
        return task;
      });
  
      return {
        tasks: newArray,
      };
    });
  };  

  deleteItem = (id) => {
    this.setState(({ tasks }) => {
      const newArray = tasks.filter((task) => task.id !== id);
      return {
        tasks: newArray,
      };
    });
  };  

  onFilterChange = (filter) => {
    this.setState({ filter });
  };

  clearCompleted = () => {
    this.setState(({ tasks }) => {
      const filteredTasks = tasks.filter((task) => !task.done);
      return {
        tasks: filteredTasks,
      };
    });
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
            tasks={filteredTasks}
            onDeleted={this.deleteItem}
            onToggleDone={this.onToggleDone}
            handleKeyDown={App.handleKeyDown}
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