export const addTokenToHeader=({headers})=>{
    const token=localStorage.getItem("token")
    if(token){
        headers.Authorization=`Bearer ${token}`
    }
    return  headers
}