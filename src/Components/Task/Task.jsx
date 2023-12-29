import React, { useState, useRef, useEffect } from 'react';
import './Task.scss';
import { formatDistanceToNow } from 'date-fns';
import PropTypes from 'prop-types';

export default function Task({ id, setTasks, description, created, done, time, pause, isEditing, startEditing, stopEditing }) {
  const [editText, setEditText] = useState(description);
  const editInputRef = useRef(null);

  useEffect(() => {
    if (isEditing && editInputRef.current) {
      const input = editInputRef.current;
      input.focus();
      input.selectionStart = input.value.length;
      input.selectionEnd = input.value.length;
    }
  }, [isEditing]);

  const updateTasks = (updateFunc) => {
    setTasks((currentTasks) => currentTasks.map(task => (task.id === id ? updateFunc(task) : task)));
  };

  const onToggleDone = () => {
    updateTasks(task => ({ ...task, done: !task.done }));
  };

  const toggleTimer = () => {
    updateTasks(task => ({ ...task, pause: !task.pause }));
  };

  const deleteItem = () => {
    setTasks((currentTasks) => currentTasks.filter(task => task.id !== id));
  };

  const handleEdit = () => {
    startEditing();
  };

  const saveEdit = () => {
    updateTasks(task => ({ ...task, description: editText }));
    stopEditing();
  };

  const cancelEdit = () => {
    setEditText(description);
    stopEditing();
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      saveEdit();
    } else if (e.key === 'Escape') {
      cancelEdit();
    }
  };

  const handleChange = (e) => {
    setEditText(e.target.value);
  };

  let taskTime = formatDistanceToNow(created);

  if (taskTime === "less than a minute") {
    taskTime = "less than minute ago";
  } else if (taskTime.includes("minute")) {
    taskTime = `created ${taskTime.split(" ")[0]} minutes ago`;
  } else if (taskTime.includes("hour")) {
    taskTime = `created ${taskTime.split(" ")[0]} hours ago`;
  }

  let className = 'title';
  if (done) {
    className += ' completed';
  }

  return (
    <div className="view">
      {isEditing ? (
        <input
          type="text"
          className="edit"
          ref={editInputRef}
          value={editText}
          onChange={handleChange}
          onKeyDown={handleKeyPress}
          onBlur={saveEdit}
          id={`edit-${id}`}
        />
      ) : (
        <>
          <input
            className="toggle"
            type="checkbox"
            checked={done}
            onChange={onToggleDone}
            id={`toggle-${id}`}
          />
          <label htmlFor={`toggle-${id}`}>
            <button 
              type='button' 
              className={className} 
              onClick={onToggleDone}
              tabIndex="0"
            >
              {description}
            </button>
            <span className="description">
              <button 
                type='button'
                className={`${pause ? 'icon-play' : 'icon-pause'}`}
                onClick={toggleTimer}
                tabIndex={0}
                aria-label={pause ? 'Play' : 'Pause'}
              />
              <span className="time">{`${Math.floor(time / 60).toString().padStart(2, '0')}:${(time % 60).toString().padStart(2, '0')}`}</span>
              <span className="created">{taskTime}</span>
            </span>
          </label>
          <button type='button' className="icon icon-edit" onClick={handleEdit} aria-label="Edit"/>
          <button type='button' className="icon icon-destroy" onClick={deleteItem} aria-label="Delete"/>
        </>
      )}
    </div>
  );
}

Task.propTypes = {
  id: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  done: PropTypes.bool.isRequired,
  setTasks: PropTypes.func.isRequired,
  time: PropTypes.number.isRequired,
  pause: PropTypes.bool.isRequired,
  created: PropTypes.instanceOf(Date).isRequired,
  isEditing: PropTypes.bool.isRequired,
  startEditing: PropTypes.func.isRequired,
  stopEditing: PropTypes.func.isRequired
}