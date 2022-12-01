const host = "http://localhost:3030/";


async function requester(method, url, data){
    const user = JSON.parse(localStorage.getItem("user"));
    const option = {
        method,
        headers: {}
    }  
    if(data){
        option.headers["Content-Type"] = "Application/json";
        option.body = JSON.stringify(data);
    }

    if(user){
        const token = user.accessToken;
        option.headers["X-Authorization"] = token;
    }

    try{
        const response = await fetch(host + url,option);
        if(!response.ok){
            if(response.status === 403){
                sessionStorage.removeItem("user");
            }
            const err = await response.json();
            throw new Error(err.message);
        }   
        if(response.status === 204){
            return response;
        }   
        else{
            const data = await response.json();
            return data;
        }
    }
    catch(err){
        alert(err.message);
        throw err;
    }
}

const get = requester.bind(null, "get");
const post = requester.bind(null, "post");
const put = requester.bind(null, "get");
const del = requester.bind(null, "delete");

export {
    get,
    post,
    put,
    del as delete
}

