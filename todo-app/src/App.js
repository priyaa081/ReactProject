import { useState, useEffect } from 'react';
import './App.css';

// Define themes
const themes = {
  dark: 'dark-theme',
  light: 'light-theme',
  colorful: 'colorful-theme',
  purple: 'purple-theme',
  ocean: 'ocean-theme',
};

function App() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [currentTheme, setCurrentTheme] = useState('dark');
  
  // Set theme class on body
  useEffect(() => {
    // Remove all theme classes
    document.body.classList.remove(...Object.values(themes));
    // Add current theme class
    document.body.classList.add(themes[currentTheme]);
  }, [currentTheme]);

  const addTodo = () => {
    if (inputValue.trim() !== '') {
      setTodos([...todos, { text: inputValue, completed: false, id: Date.now() }]);
      setInputValue('');
    }
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const toggleComplete = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTodo();
    }
  };

  return (
    <div className="App">
      <div className="todo-container">
        <h1>Todo List</h1>
        
        <div className="theme-selector">
          <p>Choose theme:</p>
          <div className="theme-buttons">
            <button 
              className={`theme-btn light-btn ${currentTheme === 'light' ? 'active' : ''}`}
              onClick={() => setCurrentTheme('light')}
            />
            <button 
              className={`theme-btn dark-btn ${currentTheme === 'dark' ? 'active' : ''}`}
              onClick={() => setCurrentTheme('dark')}
            />
            <button 
              className={`theme-btn colorful-btn ${currentTheme === 'colorful' ? 'active' : ''}`}
              onClick={() => setCurrentTheme('colorful')}
            />
            <button 
              className={`theme-btn purple-btn ${currentTheme === 'purple' ? 'active' : ''}`}
              onClick={() => setCurrentTheme('purple')}
            />
            <button 
              className={`theme-btn ocean-btn ${currentTheme === 'ocean' ? 'active' : ''}`}
              onClick={() => setCurrentTheme('ocean')}
            />
          </div>
        </div>
        
        <div className="input-container">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Add a new task..."
          />
          <button onClick={addTodo}>
            Add
          </button>
        </div>
        
        {todos.length > 0 && (
          <div className="task-counter">
            <span className="completed-count">
              {todos.filter(todo => todo.completed).length} / {todos.length} completed
            </span>
          </div>
        )}
        
        <ul className="todo-list">
          {todos.map((todo) => (
            <li 
              key={todo.id} 
              className={todo.completed ? 'completed' : ''}
            >
              <span 
                className="todo-text"
                onClick={() => toggleComplete(todo.id)}
              >
                {todo.text}
              </span>
              <button 
                className="delete-btn"
                onClick={() => deleteTodo(todo.id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
        
        {todos.length === 0 && (
          <p className="empty-message">
            No tasks yet! Add one above.
          </p>
        )}
      </div>
    </div>
  );
}

export default App;
