export const login = 'user';

export const loginAction = (email) => ({
  type: login,
  email,
});
