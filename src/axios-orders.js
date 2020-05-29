import axios from 'axios'

const instance =  axios.create({
    baseURL: 'https://testing-9511d.firebaseio.com/'
})

export default instance