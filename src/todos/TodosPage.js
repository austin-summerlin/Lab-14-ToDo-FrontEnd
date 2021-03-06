import { Component } from 'react';
import { addTodo, getTodo, deleteTodo, updateTodo } from '../utils/todo-api.js';
import './TodosPage.css';
import { NavLink } from 'react-router-dom';

export default class TodosPage extends Component {
  state = {
    task: '',
    completed: false,
    todos: []
  }

  async componentDidMount() {
    try {
      const todos = await getTodo();
      this.setState({ todos: todos });
    }
    catch (err) {
      console.log(err);
    }
  }

  handleAdd = async e => {
    e.preventDefault();
    const { task, todos } = this.state;

    try {
      const addedTask = await addTodo({ task: task, completed: false });
      const updatedTodo = [...todos, addedTask];
      this.setState({
        todos: updatedTodo,
        task: '',
        completed: false
      });
    }
    catch (err) {
      console.log(err.message);
    }
  }

  handleTaskChange = ({ target }) => {
    this.setState({ task: target.value });
  }

  handleDelete = async id => {
    const { todos } = this.state;

    try {
      await deleteTodo(id);

      const updatedTodo = todos.filter(todo => todo.id !== id);
      this.setState({ todos: updatedTodo });
    }
    catch (err) {
      console.log(err);
    }
  }

  handleUpdate = async todo => {
    const { todos } = this.state;

    try {
      const updatedTodo = await updateTodo(todo);

      const updatedTodos = todos.map(todo => todo.id === updatedTodo.id ? updatedTodo : todo);
      this.setState({ todos: updatedTodos });
    }
    catch (err) {
      console.log(err);
    }
  }

  render() {
    const { task, todos } = this.state;

    return (
      <div className="TodosPage">
        <form onSubmit={this.handleAdd}>
          <h2>Add a new task...</h2>
          <input value={task} className='add-task' onChange={this.handleTaskChange} />
        </form>
        <ul>
          {todos.map(todo => (
            <li key={todo.id}>
              <label>
                {/* when input checkbox is selected, it calls {() => this.handleUpdate(todo)} */}
                <input type="checkbox" checked={todo.completed} onClick={() => this.handleUpdate(todo)} />
                <h3>{todo.task}</h3>
              </label>
              <button className='delete' onClick={() => this.handleDelete(todo.id)}><i class="fas fa-trash-alt"></i></button>
            </li>
          ))}
        </ul>
        <NavLink to="/auth" onClick={() => localStorage.clear('TOKEN')} >Log Out</NavLink>
      </div>
    );
  }

}