import { httpService } from "./http.service"

export const userService = {
    login,
    signup,
    logout,
    getLoggedInUser,
    getUsers,
    getUserById,
    updateUser
}


async function login(credentials){
    try{
        const user =  await httpService.post('auth/login',credentials)
        sessionStorage.setItem('loggedInUser',JSON.stringify(user))
        return user
    }
    catch(error){
        console.log(error);

    }
}

async function getUserById(userId){
    try{

        return  await httpService.get(`user/${userId}`)
    }
    catch(error){
        console.log(error);
    }


}

async function getUsers(){
    try{    
       return await httpService.get('user/')

    }
    catch(error){
        console.log(error);
    }
}



function getLoggedInUser(){
    const user =  JSON.parse(sessionStorage.getItem('loggedInUser'))
    return user
}

async function logout(){
    try{
        const user =  await httpService.post('auth/logout')
        sessionStorage.clear()
        return user
        
    }
    catch(error){
        console.log(error);
    }
}

async function signup(credentials){
    try{
        return await httpService.post('auth/signup',credentials)
    
    }
    catch(error){
        console.log(error);
    }

        
} 

async function updateUser(user){
    try{
        return await httpService.put(`user/${user._id}`,user)
    }
    catch(error){
        console.log(error);
    }
}