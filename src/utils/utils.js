export const validateNumber = (event) => {
    const keyCode = event.keyCode;

    const excludedKeys = [8, 37, 39, 46];

    if (!((keyCode >= 48 && keyCode <= 57) ||
        (keyCode >= 96 && keyCode <= 105) ||
        (excludedKeys.includes(keyCode)))) {
        event.preventDefault();
    }

}

//Reusable post function which can be used for PUT method too

export const postData = async (method, data, url) => {
    const requestOptions = {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    };
    const response = await fetch(
        `https://hiring.getbasis.co/candidate/${url}`,
        requestOptions
    );

    const postResponse = await response.json();
    return postResponse;

}

//used for PUT method without any body object
export const urlData = async (url) => {
    const requestOptions = {
        method: 'PUT'
    };
    const response = await fetch(
        `https://hiring.getbasis.co/candidate/${url}`,
        requestOptions
    );

    const postResponse = await response.json();
    return postResponse;
}

//Authentication function
export const authUpdate = async (method, data, id, token) => {
    const requestOptions = {
        method,
        headers: {
            'Authorization': `Bearer ${id},${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };
    const response = await fetch(
        `https://hiring.getbasis.co/candidate/users/${id}`,
        requestOptions
    );
    const updateResponse = await response.json();
    return updateResponse;
}

//Logout profile function
export const logoutProfile = async (id, token) => {
    const requestOptions = {
        method: "DELETE",
        headers: {
            'Authorization': `Bearer ${id},${token}`,
            'Content-Type': 'application/json'
        }
    }
    const response = await fetch(
        `https://hiring.getbasis.co/candidate/users/logout/${id}`,
        requestOptions
    );
    const logoutResponse = await response.json();
    return logoutResponse;
}


export const BASEURL = 'https://hiring.getbasis.co/candidate';