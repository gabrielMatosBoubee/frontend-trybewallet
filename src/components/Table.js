import React, { Component } from 'react';
import { connect } from 'react-redux';

class Table extends Component {
  render() {
    const { expenses } = this.props;
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          {/* <tbody>
            { expenses.map((element) => ((
              <tr key={ element.id }>
                <td>{element.description}</td>
                <td>{element.tag}</td>
                <td>{element.payment}</td>
                <td>{element.value}</td>
                <td>{element.currency}</td>
                <td>{element.method}</td>
                <td>{element.exchangeRates[element.currency]}</td>
                <td>
                  {
                    Number(element.exchangeRates[element.currency])
                    * Number(element.value)
                  }
                </td>
                <td>Real</td>
                <button type="button">Editar/Excluir</button>
              </tr>
            ))) }
          </tbody> */}
        </table>
      </div>
    );
  }
}

const mapStateToProps = (globalState) => ({
  expenses: globalState.wallet.expenses,
});

export default connect(mapStateToProps)(Table);
