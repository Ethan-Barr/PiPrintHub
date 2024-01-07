// Todo.js
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faCog } from '@fortawesome/free-solid-svg-icons';
import './styles/todo.css';

function Todo() {
    const [todos, setTodos] = useState([]);
    const [editingTodo, setEditingTodo] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [task, setTask] = useState('');
    const [printTime, setPrintTime] = useState('');
    const [priority, setPriority] = useState('Low');

    useEffect(() => {
        // Load data from localStorage when the component mounts
        const savedTodos = JSON.parse(localStorage.getItem('todos')) || [];
        setTodos(savedTodos);
    }, []);

    const addTodo = (e) => {
        e.preventDefault();
        if (editingTodo) {
            // Edit existing todo
            const updatedTodos = todos.map((todo) =>
                todo.id === editingTodo.id ? { ...todo, task, printTime, priority } : todo
            );
            setTodos(updatedTodos);
            setEditingTodo(null);
        } else {
            // Add new todo
            setTodos([...todos, { id: Date.now(), task, printTime, priority }]);
        }
        setShowForm(false);
        setTask('');
        setPrintTime('');
        setPriority('Low');
        // Save the todos to localStorage after modifying
        localStorage.setItem('todos', JSON.stringify(todos));
    };

    const deleteTodo = (id) => {
        setTodos(todos.filter((todo) => todo.id !== id));
        // Save the todos to localStorage after deleting
        localStorage.setItem('todos', JSON.stringify(todos));
    };

    const editTodo = (todo) => {
        setEditingTodo(todo);
        setTask(todo.task);
        setPrintTime(todo.printTime);
        setPriority(todo.priority);
        setShowForm(true);
    };

    return (
        <div className="Todo">
            <h1>Job list</h1>
            <button onClick={() => setShowForm(!showForm)}>
                {showForm ? 'Hide Form' : 'Create Task'}
            </button>
            {showForm && (
                <form onSubmit={addTodo} className="todo-form">
                    <label>
                        Task:
                        <input
                            type="text"
                            value={task}
                            onChange={(e) => setTask(e.target.value)}
                            required
                        />
                    </label>
                    <label>
                        Estimated print time:
                        <input
                            type="text"
                            value={printTime}
                            onChange={(e) => setPrintTime(e.target.value)}
                            required
                        />
                    </label>
                    <label>
                        Priority:
                        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                        </select>
                    </label>
                    <button type="submit">{editingTodo ? 'Edit Todo' : 'Add Todo'}</button>
                </form>
            )}
            <div className="todo-list">
                <div className="scrollable-container">
                    {todos.map((todo) => (
                        <div key={todo.id} className="todo-item">
                            <div>
                                <strong>Task:</strong> {todo.task}
                            </div>
                            <div>
                                <strong>Print time:</strong> {todo.printTime}
                            </div>
                            <div>
                                <strong>Priority:</strong> {todo.priority}
                            </div>
                            <div className="action-icons">
                                <FontAwesomeIcon icon={faCog} onClick={() => editTodo(todo)} />
                                <FontAwesomeIcon icon={faTrash} onClick={() => deleteTodo(todo.id)} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Todo;
