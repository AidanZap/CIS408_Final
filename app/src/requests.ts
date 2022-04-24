import { RestMethod } from "./interfaces"

const Request = async (urlString: string, restMethod: RestMethod, params: any) => {

    let method;
    switch(restMethod) {
        case RestMethod.GET: method = "GET"; break;
        case RestMethod.POST: method = "POST"; break;
        case RestMethod.PATCH: method = "PATCH"; break;
        case RestMethod.DELETE: method = "DELETE"; break;
    }

    let url = new URL(urlString);
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))

    const response = await fetch(url.toString(), {
        method: method,
        headers: {
            "Content-Type": "application/json"
        }
    })
  
    return response;
}

export default Request;