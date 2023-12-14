import axios from 'axios' //facilitador de requisições http

// json-server --watch db.json
export const api = axios.create({
    //base url é a url que nunca vai mudar. ex:  http://localhost:3000/products/ a frente disso serão rotas
    baseURL:  "http://localhost:3000"
})