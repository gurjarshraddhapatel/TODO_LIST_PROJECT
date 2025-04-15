import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from './Header';

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [form, setForm] = useState({ title: '', description: '', isCompleted: false });
  const [editId, setEditId] = useState(null);
  const [message, setMessage] = useState('');

  const token = localStorage.getItem('token');

  const axiosConfig = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const fetchTodos = async () => {
    try {
      const res = await axios.get('https://todo-list-project-ydmi.onrender.com/todos/get-todo', axiosConfig);
      setTodos(res.data.getTodo);
      console.log('Fetched todos:', res.data.getTodo);
    } catch (err) {
      console.error('Fetch error:', err);
      setMessage('Failed to load todos');
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editId) {
        await axios.patch(
          `https://todo-list-project-ydmi.onrender.com/todos/update-todo/${editId}`,
          form,
          axiosConfig
        );
        setMessage('Todo updated successfully');
      } else {
        await axios.post('https://todo-list-project-ydmi.onrender.com/todos/create', form, axiosConfig);
        setMessage('Todo created successfully');
      }

      setForm({ title: '', description: '', isCompleted: false });
      setEditId(null);
      fetchTodos();
    } catch (err) {
      console.error('Submit error:', err);
      setMessage('Something went wrong');
    }
  };

  
  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://todo-list-project-ydmi.onrender.com/todos/delete-todo/${id}`, axiosConfig);
      setMessage('Todo deleted');
      fetchTodos();
    } catch (err) {
      console.error('Delete error:', err);
      setMessage('Failed to delete todo');
    }
  };

  const handleEdit = (todo) => {
    setForm({
      title: todo.title,
      description: todo.description,
      isCompleted: todo.isCompleted,
    });
    setEditId(todo._id);
  };

  return (
    <>
      <Header className="p-0" />

      <div className='row mt-5 pt-5 main-container-todo '>
        <div className="col-lg-4 mt-2 container-fluid shadow px-5 py-3 border">
          <h3 className='text-center pb-2 text-dark'>Todo Manager</h3>

          <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
            {message && <div className="alert alert-info">{message}</div>}

            <input
              type="text"
              placeholder="Title"
              className="form-control"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
            />
            <br />
            <textarea

              placeholder="Description"
              className="form-control "
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            ></textarea>
            <br />
            <label className="custom-checkbox d-flex align-items-center mb-2">
              <input
                type="checkbox"
                checked={form.isCompleted}
                className='mx-1'
                onChange={(e) => setForm({ ...form, isCompleted: e.target.checked })}
              />
              <span className="checkmark"></span>
              Completed

            </label>
            <br />
            <button type="submit" className='btn btn-todo text-white w-100 mt-1'>{editId ? 'Update Todo' : 'Add Todo'}</button>
          </form>

        


        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }} className='mx-5 mt-5 '>
          {todos.map((todo) => (
            <div key={todo._id} style={{ border: '1px solid #ccc', padding: '10px', width: 'calc(31% - 10px)', borderRadius: '5px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }} className='shadow todo-cards px-3 border-danger'>
              <div>
                <div className='d-flex justify-content-between'>
                  <h5 className='pt-2 title'>{todo.title}</h5>
                  <div>
                    <button onClick={() => handleEdit(todo)} className=' text-white btn shadow'><i className="fa-solid fa-pen-to-square text-info"></i></button>
                    <button onClick={() => handleDelete(todo._id)} className=' text-white btn shadow'><i className="fa-solid fa-trash text-danger mx-1"></i></button>
                  </div>
                </div>
                <p className='mt-3'>{todo.description}</p>
                <p>{todo.isCompleted ? '✅ Completed' : '❌ Not Completed'}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Todo;
