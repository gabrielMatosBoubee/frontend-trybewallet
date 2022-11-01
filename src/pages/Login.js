import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { loginAction } from '../redux/actions';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    able: true,
  };

  onChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value }, () => this.validates());
  };

  validates = () => {
    const { email, password } = this.state;
    const six = 6;
    const regexEmail = (/[\w-.]+@[\w]+.com/);
    const validateEmail = regexEmail.test(email);
    const validatePassword = password.length >= six;
    if (validateEmail && validatePassword) {
      this.setState({ able: false });
      console.log('ok');
    } else this.setState({ able: true });
  };

  render() {
    const { email, able, password } = this.state;
    const { dispatch, history } = this.props;
    return (
      <section>
        <div>
          <label htmlFor="loginEmail">
            <input
              name="email"
              type="text"
              value={ email }
              id="loginEmail"
              data-testid="email-input"
              onChange={ this.onChange }
            />
          </label>
          <label htmlFor="loginPassword">
            <input
              name="password"
              type="text"
              value={ password }
              id="loginPassword"
              data-testid="password-input"
              onChange={ this.onChange }
            />
          </label>
        </div>
        <button
          type="button"
          disabled={ able }
          onClick={ () => {
            dispatch(loginAction(password, email));
            history.push('/carteira');
          } }
        >
          Entrar
        </button>
      </section>
    );
  }
}

Login.propTypes = {
  history: propTypes.shape({
    push: propTypes.func.isRequired }).isRequired,
  dispatch: propTypes.func.isRequired,
};

export default connect()(Login);
