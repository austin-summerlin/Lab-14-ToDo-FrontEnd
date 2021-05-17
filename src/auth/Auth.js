import { Component } from 'react';
import { signUp, logIn } from '../utils/todo-api.js';
import './Auth.css';

export default class auth extends Component {
  state = {
    isSignUp: true,
    name: '',
    email: '',
    password: '',
    error: ''
  }

  handleSwitch = () => {
    this.setState({ isSignUp: !this.state.signUp });
  }

  handleSubmit = async e => {
    e.preventDefault();

    const { isSignUp } = this.state;
    const { onUser, history } = this.props;

    this.setState({ error: '' });

    try {
      const action = isSignUp ? signUp : logIn;
      const user = await action(this.state);

      onUser(user);

      history.push('/');
    }
    catch (err) {
      this.setState({ error: err.error });
    }
  }

  handleNameChange = ({ target }) => {
    this.setState({ name: target.value });
  }

  handleEmailChange = ({ target }) => {
    this.setState({ email: target.value });
  }

  handlePasswordChange = ({ target }) => {
    this.setState({ password: target.value });
  }

  render() {
    const { isSignUp, name, email, password, error } = this.state;

    return (
      <form className="auth" onSubmit={this.handleSubmit}>
        {isSignUp &&
          <p>
            <label>
              <span>Name</span>
              <input name="name" value={name} required onChange={this.handleNameChange}></input>
            </label>
          </p>}

        <p>
          <label>
            <span>Email</span>
            <input name="email" value={email} required onChange={this.handleEmailChange}></input>
          </label>
        </p>

        <p>
          <label>
            <span>Password</span>
            <input name="password" value={password} required type="password" onChange={this.handlePasswordChange}></input>
          </label>
        </p>

        <p>
          <button type="submit">{isSignUp ? 'Sign Up' : 'Log In'}</button>
        </p>

        <p>
          <button type="button" className="switch" onClick={this.handleSwitch}>
            {isSignUp
              ? 'Already have an account?'
              : 'Need to create an account?'
            }
          </button>
        </p>
        {error && <p>{error}</p>}
      </form>
    );
  }

}