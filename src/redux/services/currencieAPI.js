const currencieEndPoint = 'https://economia.awesomeapi.com.br/json/all';

const getCurrencieApi = async () => {
  const reponse = await fetch(currencieEndPoint);
  const json = await reponse.json();
  delete json.USDT;
  const coins = Object.keys(json);
  return reponse.ok ? Promise.resolve(coins) : Promise.reject(coins);
};

export default getCurrencieApi;
