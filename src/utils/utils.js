export const validateNumber = (event) => {
    const keyCode = event.keyCode;

    const excludedKeys = [8, 37, 39, 46];

    if (!((keyCode >= 48 && keyCode <= 57) ||
        (keyCode >= 96 && keyCode <= 105) ||
        (excludedKeys.includes(keyCode)))) {
        event.preventDefault();
    }

}

//Reusable post function

export const postData = async (data, url) => {
    const requestOptions = {
        method: "POST",
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