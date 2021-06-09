import axios from 'axios'

const herokuInstance=axios.create({
    baseURL:'http://localhost:9000'
})

export default herokuInstance