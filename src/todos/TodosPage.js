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
    return (
      <div className="TodosPage">

      </div>
    );
  }

}