import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { addAllValue } from '../redux/actions';

class Header extends Component {
  state = {
    exchange: 'BRL',
    expenseLength: -1,
  };

  componentDidUpdate() {
    const { expenseLength } = this.state;
    const { expenses } = this.props;
    if (expenses[expenses.length - 1].id > expenseLength) {
      this.conta();
      this.setState({ expenseLength: Number((expenses[expenses.length - 1].id)) });
    }
  }

  conta = () => {
    const { expenses, dispatch } = this.props;
    const totalValue = expenses.reduce((acc, cur) => {
      const { currency } = cur;
      const currencyValue = Number(cur.exchangeRates[currency].ask);
      const { value } = cur;
      const valueWithCurrency = +value * currencyValue;
      acc += Number(valueWithCurrency);
      return acc;
    }, 0);
    // this.setState({ expense: totalValue.toFixed(2) });
    dispatch(addAllValue(totalValue));
  };

  render() {
    const { exchange } = this.state;
    const { email, allValue } = this.props;
    return (
      <div>
        <span data-testid="email-field">{email}</span>
        <p data-testid="header-currency-field">{exchange}</p>
        <p data-testid="total-field">{allValue.toFixed(2)}</p>
      </div>
    );
  }
}

const mapStateToProps = (globalStore) => ({
  email: globalStore.user.email,
  expenses: globalStore.wallet.expenses,
  allValue: globalStore.wallet.allValue,
});

Header.propTypes = {
  email: propTypes.string.isRequired,
  expenses: propTypes.arrayOf(propTypes.shape).isRequired,
  dispatch: propTypes.func.isRequired,
  allValue: propTypes.number.isRequired,
};

export default connect(mapStateToProps)(Header);
