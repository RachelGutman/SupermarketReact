import axios from 'axios'

async function getCustomers() {
    const {data} = await axios.get('/src/DB/Customers.json')
    return data
}

async function getCollection(collectionName) {
    const { data } = await axios.get(`DB/${collectionName}.json`)
    return data
}


// async function updateCustomer(userId, user) {
//     const { data } = await axios.put(`https://jsonplaceholder.typicode.com/users/${userId}`, user)
//     return data
// }


export default { getCustomers, getCollection }