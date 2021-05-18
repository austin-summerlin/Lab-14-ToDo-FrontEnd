import { Component } from 'react';
import { addTodo, getTodo, deleteTodo, updateTodo } from '../utils/todo-api.js';
import './TodosPage.css';

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
          Add a new task...
          <input value={task} onChange={this.handleTaskChange} />
        </form>
        <ul>
          {todos.map(todo => (
            <li key={todo.id}>
              <label>
                {/* when input checkbox is selected, it calls {() => this.handleUpdate(todo)} */}
                <input type="checkbox" checked={todo.completed} onClick={() => this.handleUpdate(todo)} />
                <h2>{todo.task}</h2>
              </label>
              <button className='delete' onClick={() => this.handleDelete(todo.id)}>Get outa here!</button>
            </li>
          ))}
        </ul>
      </div>
    );
  }

}