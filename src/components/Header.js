import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';

class Header extends Component {
  state = {
    expense: 0,
    exchange: 'BRL',
    expenseLength: 0,
  };

  componentDidUpdate() {
    const { expenseLength } = this.state;
    const { expenses } = this.props;
    if (expenses.length > expenseLength) {
      this.conta();
      this.setState({ expenseLength: expenses.length });
    }
  }

  conta = () => {
    const { expenses } = this.props;
    console.log(expenses);
    const totalValue = expenses.reduce((acc, cur) => {
      const { currency } = cur;
      const currencyValue = Number(cur.exchangeRates[currency].ask);
      const { value } = cur;
      const valueWithCurrency = +value * currencyValue;
      acc += Number(valueWithCurrency);
      return acc;
    }, 0);
    this.setState({ expense: totalValue.toFixed(2) });
  };

  render() {
    const { expense, exchange } = this.state;
    const { email } = this.props;
    return (
      <div>
        <span data-testid="email-field">{email}</span>
        <p data-testid="header-currency-field">{exchange}</p>
        <p data-testid="total-field">{expense}</p>
      </div>
    );
  }
}

const mapStateToProps = (globalStore) => ({
  email: globalStore.user.email,
  expenses: globalStore.wallet.expenses,
});

Header.propTypes = {
  email: propTypes.string.isRequired,
  expenses: propTypes.arrayOf(propTypes.shape).isRequired,
};

export default connect(mapStateToProps)(Header);
