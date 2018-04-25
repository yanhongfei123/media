import axios from 'axios'
const baseUrl = '';
// create an axios instance
const service = axios.create({
  baseURL: baseUrl, // api的base_url
  timeout: 5000, // request timeout
  withCredentials:true,
 // headers: {'Content-Type': 'application/x-www-form-urlencoded'}
})

// request interceptor
service.interceptors.request.use(config => {

  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

// respone interceptor
service.interceptors.response.use(
  response => response,
  error => {
    console.log('err' + error)// for debug
    // Message({
    //   message: error.message,
    //   type: 'error',
    //   duration: 5 * 1000
    // })
    return Promise.reject(error)
  })

export default service
