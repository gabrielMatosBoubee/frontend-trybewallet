import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';

class Header extends Component {
  state = {
    expense: 0,
    exchange: 'BRL',
  };

  render() {
    const { expense, exchange } = this.state;
    const { email } = this.props;
    return (
      <div>
        <span data-testid="email-field">{email}</span>
        <p data-testid="total-field">{expense}</p>
        <p data-testid="header-currency-field">{exchange}</p>
      </div>
    );
  }
}

const mapStateToProps = (globalStore) => ({
  email: globalStore.user.email,
});

Header.propTypes = {
  email: propTypes.string.isRequired,
};

export default connect(mapStateToProps)(Header);
