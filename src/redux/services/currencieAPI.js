const currencieEndPoint = 'https://economia.awesomeapi.com.br/json/all';

const getCurrencieApi = async () => {
  const reponse = await fetch(currencieEndPoint);
  const json = await reponse.json();
  delete json.USDT;
  return reponse.ok ? Promise.resolve(json) : Promise.reject(json);
};

export default getCurrencieApi;
