import { useState } from 'react';
import PropTypes from 'prop-types';
import './NewTaskForm.scss';

export default function NewTaskForm({ setTasks, createTodoItem }) {
  const [description, setDescription] = useState('');
  const [min, setMin] = useState('');
  const [sec, setSec] = useState('');

  const addItem = (text, time) => {
    const isTimerStarted = time === 0;
    const timerType = time === 0 ? 'countup' : 'countdown';
    const newItem = createTodoItem(text, time, time !== undefined, isTimerStarted, timerType);
    setTasks((currentTasks) => [...currentTasks, newItem]);
  };

  const filterInput = (value) => {
    const numValue = parseInt(value, 10);
    if (!Number.isNaN(numValue) && numValue >= 0 && numValue <= 59) {
      return numValue.toString();
    }
    return '';
  };

  const onDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const onChangeMin = (e) => {
    setMin(filterInput(e.target.value));
  };

  const onChangeSec = (e) => {
    setSec(filterInput(e.target.value));
  };

  const onSubmit = (e) => {
    e.preventDefault();
  
    const minutes = parseInt(min, 10) || 0;
    const seconds = parseInt(sec, 10) || 0;
    const totalSeconds = (minutes * 60 + seconds);
  
    if (description) {
      addItem(description, totalSeconds);
      setDescription('');
      setMin('');
      setSec('');
    }
  };

  return (
    <header className="header">
      <h1>Todos</h1>
      <form onSubmit={onSubmit}>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          onChange={onDescriptionChange}
          value={description}
        />
        <input 
          type="number"
          className="new-todo-form__timer"
          placeholder="Min"
          value={min}
          onChange={onChangeMin}
          min="0"
          max="59"
        />
        <input 
          type="number"
          className="new-todo-form__timer"
          placeholder="Sec"
          value={sec}
          onChange={onChangeSec}
          min="0"
          max="59"
        />
        <button type="submit" hidden>Add Task</button>
      </form>
    </header>
  );
}

NewTaskForm.propTypes = {
  setTasks: PropTypes.func.isRequired,
  createTodoItem: PropTypes.func.isRequired,
}