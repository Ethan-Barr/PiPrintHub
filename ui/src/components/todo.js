// TodoList.js
import React, { useState } from "react";
import "./styles/todo.css";

const TodoList = () => {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState("");

    const handleAddTodo = () => {
        if (newTodo.trim() !== "") {
            setTodos([...todos, newTodo]);
            setNewTodo("");
        }
    };

    const handleDeleteTodo = (index) => {
        const updatedTodos = [...todos];
        updatedTodos.splice(index, 1);
        setTodos(updatedTodos);
    };

    return (
        <div className="todo-list">
            <h2>Todo List</h2>
            <ul>
                {todos.map((todo, index) => (
                    <li key={index}>
                        {todo}
                        <button onClick={() => handleDeleteTodo(index)}>Delete</button>
                    </li>
                ))}
            </ul>
            <div>
                <input
                    type="text"
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    placeholder="New Todo"
                />
                <button onClick={handleAddTodo}>Add Todo</button>
            </div>
        </div>
    );
};

export default TodoList;
