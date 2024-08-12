import axios from "axios"

const getDataFromServer = () => {

    return axios.get('http://localhost:3002/items')
    .then(response => response.data)
}

const pushDataToServer = (newExpense) => {

    return axios.post("http://localhost:3002/items", newExpense , {
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => response.data)
}

export {
    getDataFromServer,
    pushDataToServer
}