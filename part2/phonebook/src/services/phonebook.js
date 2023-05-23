import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () =>{
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = (newObject) => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
}

const delEntry = (id) => {
    const delUrl = `${baseUrl}/${id}`
    console.log(delUrl)
    const request = axios.delete(delUrl)
    return request.then(response => response.data)
}

const updateEntry = (id, newObject) => {
    const updtUrl = `${baseUrl}/${id}`
    const request = axios.put(updtUrl, newObject)
    return request.then(response => response.data)
}

export default{
    getAll: getAll,
    create: create,
    delEntry: delEntry,
    updateEntry: updateEntry
}