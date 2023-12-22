import { Component } from 'react';
import PropTypes from 'prop-types';
import './NewTaskForm.scss';

export default class NewTaskForm extends Component {
  static filterInput = (value) => {
    const numValue = parseInt(value, 10);
    if (!Number.isNaN(numValue) && numValue >= 0 && numValue <= 59) {
      return numValue.toString();
    }
    return '';
  }

  constructor(props) {
    super(props);
    this.state = {
      description: '',
      min: '',
      sec: '',
    };
  }
  
  onDescriptionChange = (e) => {
    this.setState({ description: e.target.value });
  }

  onChangeMin = ({ target: { value } }) => {
  this.setState({ min: NewTaskForm.filterInput(value) });
}

  onChangeSec = ({ target: { value } }) => {
    this.setState({ sec: NewTaskForm.filterInput(value) });
  }

  onSubmit = (e) => {
    e.preventDefault();
    const { description, min, sec } = this.state;
    const { onItemAdded } = this.props;
  
    const minutes = parseInt(min, 10) || 0;
    const seconds = parseInt(sec, 10) || 0;
    const totalSeconds = (minutes * 60 + seconds);
  
    if (description) {
      onItemAdded(description, totalSeconds);
      this.setState({ description: '', min: '', sec: '' });
    }
  } 

  render() {
    const { description, min, sec } = this.state;
    
    return (
      <header className="header">
        <h1>Todos</h1>
        <form onSubmit={this.onSubmit}>
          <input
            className="new-todo"
            placeholder="What needs to be done?"
            onChange={this.onDescriptionChange}
            value={description}
          />
          <input 
            type="number"
            className="new-todo-form__timer"
            placeholder="Min"
            value={min}
            onChange={this.onChangeMin}
            min="0"
            max="59"
          />
          <input 
            type="number"
            className="new-todo-form__timer"
            placeholder="Sec"
            value={sec}
            onChange={this.onChangeSec}
            min="0"
            max="59"
          />
          <button type="submit" hidden>Add Task</button>
        </form>
      </header>
    );
  }
}

NewTaskForm.defaultProps = {
  onItemAdded: () => {},
};

NewTaskForm.propTypes = {
  onItemAdded: PropTypes.func,
};