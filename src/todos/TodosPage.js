import { Component } from 'react';
import { addTodo, getTodo, deleteTodo, updateTodo } from '../utils/todo-api.js';
import './TodosPage.css';

export default class TodosPage extends Component {
  state = {
    task: '',
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
      const addedTask = await addTodo({ name: task });
      const updatedTodo = [...todos, addedTask];
      this.setState({
        todos: updatedTodo,
        task: ''
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

  handleUpdate = async id => {
    const { todos } = this.state;

    try {
      const updatedTodo = await updateTodo(id);

      const updatedTodos = todos.map(todo => todo.id === id ? updatedTodo : todo);
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
          Add a new task...
          <input value={task} onChange={this.handleTaskChange} />
        </form>
        <ul>
          {todos.map(todo => (
            <li key={todo.id}>
              <h2>{todo.task}</h2>
              <button className='complete' onClick={() => this.handleUpdate(todo.id)}>Done-zo</button>
              <button className='delete' onClick={() => this.handleDelete(todo.id)}>Get outa here!</button>
            </li>
          ))}
        </ul>
      </div>
    );
  }

}