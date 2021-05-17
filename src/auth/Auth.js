import { Component } from 'react';
import './Auth.css';

export default class auth extends Component {
  state = {
    isSignUp: true,
    name: '',
    email: '',
    password: '',
    error: ''
  }

  render() {
    const { isSignUp, name, email, password, error } = this.state;

    return (
      <form className="auth">
        <p>
          <label>
            <span>Name</span>
            <input name="name" value={name} required></input>
          </label>
        </p>

        <p>
          <label>
            <span>Email</span>
            <input name="email" value={email} required></input>
          </label>
        </p>

        <p>
          <label>
            <span>Password</span>
            <input name="password" value={password} required></input>
          </label>
        </p>

        <p>
          <button type="submit"></button>
        </p>

        <p>
          <button>Who Dat?</button>
        </p>
      </form>
    );
  }

}