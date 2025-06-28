export const apiUrl = 'http://ecommerce-react.test/api';
export const adminToken = () => {
    const data = JSON.parse(localStorage.getItem('adminInfo'));
    return data.token;
}