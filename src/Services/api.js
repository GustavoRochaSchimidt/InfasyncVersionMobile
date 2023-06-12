import axios from 'axios'

//Coloca o local host para fazer a conexão de todos os end Points da API.
const infatecFetch = axios.create({
    baseURL: 'https://localhost:7245' 
});

export default infatecFetch