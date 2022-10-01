export const getPlanetData = async () => {
    try {
        const url = 'https://findfalcone.herokuapp.com/planets';
        const response = await fetch(url);
        const result = await response.json();
        return result;
    } catch (err) {
        console.log(err);
        return [];
    }
};

export const getSpaceShips = async () => {
    try {
        const url = 'https://findfalcone.herokuapp.com/vehicles';
        const response = await fetch(url);
        const result = await response.json();
        return result;
    } catch (err) {
        console.log(err);
        return [];
    }
}

export const findQueen = async (payload) => {
    try {
        const url = 'https://findfalcone.herokuapp.com/token';
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                Accept: 'application/json'
            }
        });
        const Token = await res.json();
        const updatedPayload = { ...payload, token: Token.token };
        const findUrl = 'https://findfalcone.herokuapp.com/find';
        const response = await fetch(findUrl, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedPayload),

        });
        const result = await response.json();
        return result;
    } catch (err) {
        console.log(err);
        return { status: 'false' }
    }

};
