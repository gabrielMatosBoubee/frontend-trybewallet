// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const inicialState = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
};

const currenciesReducer = (state = inicialState, action) => {
  switch (action.type) {
  case 'request_currencie':
    return { ...state };
  case 'request_currencie_success':
    return { ...state,
      currencies: action.currencies,
    };
  case 'addExpense':
    return { ...state,
      // const [state.expenses]
      expenses: [...state.expenses, action.expenses] };
  case 'expenseDeleted':
    return { ...state,
      expenses: action.expenses,
    };
  default: return state;
  }
};

export default currenciesReducer;
