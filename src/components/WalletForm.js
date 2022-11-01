import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { fetchCurrencie } from '../redux/actions';

class WalletForm extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCurrencie());
  }

  render() {
    const { currencies } = this.props;
    console.log(currencies);
    return (
      <div>
        <label htmlFor="value">
          Value
          <input type="text" data-testid="value-input" id="value" />
        </label>
        <label htmlFor="describe">
          Describe
          <input type="text" data-testid="description-input" id="describe" />
        </label>
        <label htmlFor="coin">
          Coin
          <select data-testid="currency-input">
            {currencies?.map((coins) => ((
              <option
                key={ coins }
                value={ coins }
              >
                {coins}
              </option>
            )))}
          </select>
        </label>
        <label htmlFor="payment">
          Payment
          <select data-testid="method-input" id="payment">
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="expense">
          Expense
          <select id="expense" data-testid="tag-input">
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>
      </div>
    );
  }
}

WalletForm.propTypes = {
  dispatch: propTypes.func.isRequired,
  currencies: propTypes.arrayOf.isRequired,
};

const mapStateToProps = (globlaState) => ({
  currencies: globlaState.wallet.currencies,
});

export default connect(mapStateToProps)(WalletForm);
