import { Component } from 'react';
import NewTaskForm from '../NewTaskForm';
import TaskList from '../TaskList';
import Footer from '../Footer';
import './App.css';


export default class App extends Component {

  maxId = 1;

  static handleKeyDown(onToggleDone) {
    return (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        onToggleDone();
      }
    };
  }

  constructor(props) {
    super(props);
    this.maxId = 1;
    this.state = {
      tasks: [
        this.createTodoItem('Completed task'),
        this.createTodoItem('Editing task'),
        this.createTodoItem('Active task')
      ],
      filter: 'All'
    };
  }

  addItem = (text) => {
    const newItem = this.createTodoItem(text);

    this.setState(({tasks})=> {
      const newArr = [
        ...tasks,
        newItem
      ];
      return {
        tasks:newArr
      };
    })
  };

  onToggleDone = (id) => {
    this.setState(({ tasks })=> {
      const idx = tasks.findIndex((el) => el.id === id)
      const oldItem = tasks[idx]
      const newItem = {...oldItem, done: !oldItem.done}
      const newArray = [
        ...tasks.slice(0, idx),
        newItem,
        ...tasks.slice(idx + 1)];

        return {
          tasks: newArray
        }
    }
  )};

  deleteItem = (id) => {
    this.setState(({ tasks }) => {
      const idx = tasks.findIndex((el) => el.id === id)

      const newArray = [
        ...tasks.slice(0, idx),
        ...tasks.slice(idx + 1)];

        return {
          tasks: newArray
        }
    })
  };

  onFilterChange = (filter) => {
    this.setState({ filter });
  };
  
  clearCompleted = () => {
    this.setState(({ tasks }) => {
      const filteredTasks = tasks.filter(task => !task.done);
      return {
        tasks: filteredTasks
      };
    });
  };

  createTodoItem(text) {
    const id = this.maxId;
    this.maxId += 1;
    
    return {
      id,
      description: text,
      created: new Date(),
      done: false,
    };
  }
  

  render() {
    const { tasks, filter  } = this.state;
    const doneCount = tasks.filter(({ done }) => !done).length;

    const filteredTasks = tasks.filter(task => {
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
          tasks={ filteredTasks  } 
          onDeleted={ this.deleteItem }
          onToggleDone={this.onToggleDone}
          handleKeyDown={App.handleKeyDown}/>
          <Footer count={ doneCount } 
          onFilterChange={this.onFilterChange} 
          clearCompleted={this.clearCompleted}/>
        </section>
      </section>
    );
  }
}