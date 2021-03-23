function fetchCountries(searchQuery) {
    const url = `https://restcountries.eu/rest/v2/name/${searchQuery}`; 
    // const options = {
    //     headers: {
    //          Autorization:'//key'
    //      }
    // }
    return fetch(url)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
        })
    
};

export default fetchCountries