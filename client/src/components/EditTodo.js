import {useState} from "react";

const EditTodo = ({todo}) => {
    const [description, setDescription] = useState(todo.description);

    const onEditTodo = async (e) => {
       e.preventDefault();

       try {
           //Anytime we are adding data, we need to package it
           const body = {description};
           const response = await fetch(`http://localhost:5000/todos/${todo.todo_id}`, {
               method: "PUT",
               headers: {"Content-Type": "application/json"},
               body: JSON.stringify(body)
           })

           window.location = '/';
       } catch(err) {
           console.log(err.message);
       }
    }

    return (<>
        <button
            type="button"
            className="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target={`#id${todo.todo_id}`}
        >
            Edit
        </button>

        <div className="modal" id={`id${todo.todo_id}`}>
            <div className="modal-dialog">
                <div className="modal-content">

                    <div className="modal-header">
                        <h4 className="modal-title">Edit Todo</h4>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            onClick={() => setDescription(todo.description)}
                        ></button>
                    </div>

                    <div className="modal-body">
                        <input
                            type="text"
                            className='form-control'
                            onChange={e => setDescription(e.target.value)}
                            value={description}
                        />
                    </div>

                    <div className='d-flex ms-auto'>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-primary"
                                data-bs-dismiss="modal"
                                onClick={e => onEditTodo(e)}
                            >
                                Edit
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </>)
}

export default EditTodo;