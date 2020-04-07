import axios from 'axios';

const axiosOrders = axios.create({
    baseURL: 'https://react-burger-builder-fea06.firebaseio.com'
});

export default axiosOrders;
