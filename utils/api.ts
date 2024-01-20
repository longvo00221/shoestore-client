import {STRAPI_API_TOKEN,API_URL} from './urls'

const fetchDataFromApi = async (endpoint: string) =>{
    const options = {
        method: 'GET',
        headers:{
            Authorization : `Bearer ${STRAPI_API_TOKEN}`
        }
    }

    const res = await fetch(`${API_URL}${endpoint}`,options)
    const data = await res.json()
    return data
}
const makePaymentRequest = async (endpoint:string,payload:any) => {
    const res = await fetch(`${API_URL}${endpoint}`,{
        method: 'POST',
        headers:{
            Authorization : `Bearer ${STRAPI_API_TOKEN}`,
            "Content-Type":"Application/json"
        },
        body:JSON.stringify(payload)
    })
    const data = await res.json()
    return data 
}
export {fetchDataFromApi,makePaymentRequest}