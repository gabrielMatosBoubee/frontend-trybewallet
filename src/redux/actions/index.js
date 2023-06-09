import getCurrencieApi from '../services/currencieAPI';

export const login = 'user';

export const loginAction = (email) => ({
  type: login,
  email,
});

export const requestCurrencie = () => ({
  type: 'request_currencie',
});

export const requestCurrencieSuccess = (payload) => ({
  type: 'request_currencie_success',
  currencies: payload,
});

export function fetchCurrencie() {
  return async (dispatch) => {
    dispatch(requestCurrencie());

    const response = await getCurrencieApi();
    dispatch(requestCurrencieSuccess(response));
  };
}

export const addExpense = (payload) => ({
  type: 'addExpense',
  expenses: payload,
});

export const expenseDeleted = (payload) => ({
  type: 'expenseDeleted',
  expenses: payload,
});

export const addAllValue = (payload) => ({
  type: 'addAllValue',
  allValue: payload,
});

export const editBtnAction = (payload) => ({
  type: 'editBtnAction',
  editBtn: payload,
});

export const editBtnExpenseAction = (payload) => ({
  type: 'editBtnExpense',
  newExpenses: payload,
});
