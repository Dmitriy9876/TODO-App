import './Task.css';
import { formatDistanceToNow } from 'date-fns';
import PropTypes from 'prop-types';


export default function Task({ description, created, onDeleted, onToggleDone, done, handleKeyDown  }) {
  const distanceToNow = formatDistanceToNow(new Date(created), { includeSeconds: true });

  let classNames = 'description';
  if (done) {
    classNames += ' done';
  }

  return (
    <div className="task">
      <div className="view">
        <input 
          className="toggle" 
          type="checkbox" 
          checked={done}
          onChange={onToggleDone} 
        />
        <label htmlFor={`toggle-checkbox-${description}`}>
          <span 
            className={classNames}
            onClick={onToggleDone}
            onKeyDown={handleKeyDown}  
            role="button"  
            tabIndex="0"   
          >
            {description}
          </span>
          <span className="created">created {distanceToNow} ago</span>
        </label>
        <button type="button" className="icon icon-edit" aria-label="Edit task" />
        <button 
          type="button"
          className="icon icon-destroy"
          onClick={onDeleted}
          aria-label="Delete task"
        />
      </div>
    </div>
  );
}

Task.propTypes = {
  description: PropTypes.string.isRequired,
  created: PropTypes.instanceOf(Date).isRequired,
  onDeleted: PropTypes.func,
  onToggleDone: PropTypes.func,
  done: PropTypes.bool,
  handleKeyDown: PropTypes.func
};

Task.defaultProps = {
  done: false,
  onDeleted: () => {},
  onToggleDone: () => {},
  handleKeyDown: () => {}
};
