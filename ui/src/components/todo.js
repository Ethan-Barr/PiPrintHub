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
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        const savedTodos = JSON.parse(localStorage.getItem('todos')) || [];
        setTodos(savedTodos);
    }, []);

    const addTodo = (e) => {
        e.preventDefault();
        if (editingTodo) {
            const updatedTodos = todos.map((todo) =>
                todo.id === editingTodo.id ? { ...todo, task, printTime, priority } : todo
            );
            setTodos(updatedTodos);
            setEditingTodo(null);
            setIsEditing(false);
        } else {
            const newTodo = { id: Date.now(), task, printTime, priority };
            setTodos([...todos, newTodo]);
            localStorage.setItem('todos', JSON.stringify([...todos, newTodo]));
        }
        setShowForm(false);
        setTask('');
        setPrintTime('');
        setPriority('Low');
    };

    const deleteTodo = (id) => {
        setTodos(todos.filter((todo) => todo.id !== id))
        localStorage.setItem('todos', JSON.stringify(todos.filter((todo) => todo.id !== id)));
    };

    const editTodo = (todo) => {
        setEditingTodo(todo);
        setTask(todo.task);
        setPrintTime(todo.printTime);
        setPriority(todo.priority);
        setShowForm(true);
        setIsEditing(true);
    };

    const hideForm = () => {
        setShowForm(false);
        setTask('');
        setPrintTime('');
        setPriority('Low');
        if (isEditing) {
            setEditingTodo(null);
            setIsEditing(false);
        }
    };

    return (
        <div className="Todo">
            <h1>Job list</h1>
            <button onClick={showForm ? hideForm : () => setShowForm(true)}>
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
                    <button type="submit">{isEditing ? 'Save Todo' : 'Add Todo'}</button>
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
