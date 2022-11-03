// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const inicialState = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
  allValue: 0,
  editBtn: { edit: false },
};

const currenciesReducer = (state = inicialState, action) => {
  switch (action.type) {
  case 'request_currencie':
    return { ...state };
  case 'request_currencie_success':
    return { ...state,
      currencies: Object.keys(action.currencies),
    };
  case 'addExpense':
    return { ...state,
      // const [state.expenses]
      expenses: [...state.expenses, action.expenses] };
  case 'expenseDeleted':
    return { ...state,
      expenses: action.expenses,
    };
  case 'addAllValue':
    return { ...state,
      allValue: action.allValue,
    };
  case 'editBtnAction':
    return { ...state,
      editBtn: action.editBtn,
    };
  case 'editBtnExpense':
    return { ...state,
      expenses: (action.newExpenses),
    };
  default: return state;
  }
};

export default currenciesReducer;
