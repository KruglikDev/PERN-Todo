import {useEffect, useState} from "react";
import EditTodo from "./EditTodo";

const ListTodos = () => {
    const [todos, setTodos] = useState([]);

    const getTodos = async () => {
        try {
            const response = await fetch("http://localhost:5000/todos");
            const jsonData = await response.json();

            setTodos(jsonData);
        } catch (err) {
            console.log(err.message);
        }
    }

    const deleteTodo = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/todos/${id}`, {
                method: "DELETE",
            })
            setTodos(todos.filter(todo => todo.todo_id !== id));
        } catch (err) {
            console.log(err.message);
        }
    }

    useEffect(() => {
        getTodos();
    }, [])

    return (<table className="table mt-5 text-center">
        <thead>
            <tr>
                <th>Description</th>
                <th>Edit</th>
                <th>Delete</th>
            </tr>
        </thead>

        <tbody>
        {todos.map((todo, i) => (<tr key={i}>
            <td>{todo.description}</td>
            <td>
                <EditTodo todo={todo}/>
            </td>
            <td>
                <button
                    onClick={() => deleteTodo(todo.todo_id)}
                    className='btn btn-danger'
                >
                    Delete
                </button>
            </td>
        </tr>))}

        </tbody>
    </table>)
}

export default ListTodos;