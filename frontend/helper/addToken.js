export function addTokenToHeader({headers}){
    const token=localStorage.getItem("token")
    if(token){
        headers.Authorization = `${token}`
    }else{
        console.log("token not found")
    }
    return headers
}