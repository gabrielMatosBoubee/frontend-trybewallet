// Esse reducer será responsável por tratar as informações da pessoa usuária

const inicialState = {
  email: '',
};

const userReducer = (state = inicialState, action) => {
  switch (action.type) {
  case 'login':
    return { ...state,
      email: action.payload.email,
    };
  default: return state;
  }
};

export default userReducer;
