import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { editBtnAction, expenseDeleted } from '../redux/actions';

class Table extends Component {
  onClick = ({ target: { name } }) => {
    const { expenses, dispatch } = this.props;
    const expensesFilter = expenses
      .filter((element) => Number(element.id) !== Number(name));
    dispatch(expenseDeleted(expensesFilter));
  };

  onClickEditBtn = ({ target: { name } }) => {
    const { dispatch } = this.props;
    dispatch(editBtnAction(({ edit: true, id: name })));
  };

  render() {
    const { expenses } = this.props;
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th className="1">Descrição</th>
              <th className="2">Tag</th>
              <th className="3">Método de pagamento</th>
              <th className="4">Valor</th>
              <th className="5">Moeda</th>
              <th className="6">Câmbio utilizado</th>
              <th className="7">Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            { expenses?.map((element) => ((
              <tr key={ element.id }>
                <td className="1">{element.description}</td>
                <td className="2">{element.tag}</td>
                <td className="3">{element.method}</td>
                <td className="4">{(Number(element.value)).toFixed(2)}</td>
                <td className="5">{element.exchangeRates[element.currency].name}</td>
                <td className="6">
                  {
                    (Number(element.exchangeRates[element.currency].ask)).toFixed(2)
                  }
                </td>
                <td className="7">
                  {(Number(element.exchangeRates[element.currency].ask)
                  * Number(element.value)).toFixed(2)}
                </td>
                <td>Real</td>
                <td>
                  <button
                    name={ element.id }
                    type="button"
                    data-testid="delete-btn"
                    onClick={ this.onClick }
                  >
                    Excluir
                  </button>
                  <button
                    name={ element.id }
                    data-testid="edit-btn"
                    type="button"
                    onClick={ this.onClickEditBtn }
                  >
                    Editar
                  </button>
                </td>
              </tr>
            ))) }
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (globalState) => ({
  expenses: globalState.wallet.expenses,
});

Table.propTypes = {
  expenses: propTypes.arrayOf(propTypes.shape).isRequired,
  dispatch: propTypes.func.isRequired,
};

export default connect(mapStateToProps)(Table);
