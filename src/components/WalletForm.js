import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import {
  addExpense,
  editBtnAction,
  fetchCurrencie,
  editBtnExpenseAction } from '../redux/actions';
import getCurrencieApi from '../redux/services/currencieAPI';

class WalletForm extends Component {
  state = {
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
    id: 0,
    exchangeRates: {},
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCurrencie());
  }

  onClick = async () => {
    const { dispatch } = this.props;
    const response = await getCurrencieApi();
    this.setState({ exchangeRates: response }, async () => {
      await dispatch(addExpense(this.state));
      const { id } = this.state;
      let idAtual = id;
      idAtual += 1;
      this.setState({ id: idAtual }, () => {
        this.setState({ value: '', description: '' });
      });
    });
  };

  onInputChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  onClickBtnEdit = async () => {
    const { dispatch, expenses, editBtn } = this.props;
    const response = await getCurrencieApi();
    const expensesOldFilter = expenses
      .filter((element) => element.id !== +editBtn.id);
    console.log(expensesOldFilter);
    this.setState({ exchangeRates: response }, async () => {
      const newExpenses = ({ ...this.state, id: +editBtn.id });
      await expensesOldFilter.push(newExpenses);
      dispatch(editBtnExpenseAction(expensesOldFilter.sort((a, b) => a.id - b.id)));
      // dispatch(addExpense(({ ...this.state, id: editBtn.id })));
      dispatch(editBtnAction(({ edit: false })));
    });
  };

  render() {
    const { currencies, editBtn } = this.props;
    const { value, description, currency, method, tag } = this.state;
    return (
      <div>
        <label htmlFor="value">
          Value
          <input
            name="value"
            value={ value }
            type="text"
            data-testid="value-input"
            id="value"
            onChange={ this.onInputChange }
          />
        </label>
        <label htmlFor="describe">
          Describe
          <input
            name="description"
            value={ description }
            type="text"
            data-testid="description-input"
            id="describe"
            onChange={ this.onInputChange }
          />
        </label>
        <label htmlFor="coin">
          currency
          <select
            data-testid="currency-input"
            name="currency"
            value={ currency }
            onChange={ this.onInputChange }
          >
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
          <select
            data-testid="method-input"
            id="payment"
            name="method"
            value={ method }
            onChange={ this.onInputChange }
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="expense">
          Expense
          <select
            id="expense"
            data-testid="tag-input"
            name="tag"
            value={ tag }
            onChange={ this.onInputChange }
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>
        {editBtn.edit ? (
          <button
            type="button"
            onClick={ this.onClickBtnEdit }
          >
            Editar Despesa

          </button>
        )
          : <button type="button" onClick={ this.onClick }>Adicionar despesa</button>}
      </div>
    );
  }
}

WalletForm.propTypes = {
  dispatch: propTypes.func.isRequired,
  currencies: propTypes.shape.isRequired,
  expenses: propTypes.arrayOf(propTypes.shape).isRequired,
  editBtn: propTypes.shape.isRequired,
};

const mapStateToProps = (globlaState) => ({
  currencies: globlaState.wallet.currencies,
  editBtn: globlaState.wallet.editBtn,
  expenses: globlaState.wallet.expenses,
});

export default connect(mapStateToProps)(WalletForm);
