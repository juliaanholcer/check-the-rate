import moment from 'moment';
export const fetchAllData = () => fetch('http://api.nbp.pl/api/exchangerates/tables/C/?format=json')
    .then(response => response.json());

export const fetchSingleData = (currency, number) => {
    return fetch(`http://api.nbp.pl/api/exchangerates/rates/c/${currency}/last/${number}/?format=json`)
    .then(response => response.json());
};

export const fetchTimeData = (currency, startDate, endDate) => {
    const start = moment(startDate).format('YYYY-MM-DD');
    const end = moment(endDate).format('YYYY-MM-DD');
    return  fetch(`http://api.nbp.pl/api/exchangerates/rates/c/${currency}/${start}/${end}/?format=json`)
    .then(response => response.json());
};

const FetchDataService = {
    fetchAllData,
    fetchSingleData,
    fetchTimeData,
};

export default FetchDataService;
