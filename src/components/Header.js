import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';

class Header extends Component {
  state = {
    exchange: 'BRL',
  };

  conta = () => {
    const { expenses } = this.props;
    const totalValue = expenses.reduce((acc, cur) => {
      const { currency } = cur;
      const currencyValue = Number(cur.exchangeRates[currency].ask);
      const { value } = cur;
      const valueWithCurrency = +value * currencyValue;
      acc += Number(valueWithCurrency);
      return acc;
    }, 0);
    return totalValue.toFixed(2);
  };

  render() {
    const { exchange } = this.state;
    const { email } = this.props;
    return (
      <div>
        <span data-testid="email-field">{email}</span>
        <p data-testid="header-currency-field">{exchange}</p>
        <p data-testid="total-field">{String(this.conta())}</p>
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
};

export default connect(mapStateToProps)(Header);
