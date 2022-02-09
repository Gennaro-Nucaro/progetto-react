import moment from "moment";


export const getExpiration = () => {
    const expiration = localStorage.getItem("expires");

    if (expiration) {
        const expiresAt = JSON.parse(expiration);
        return moment(expiresAt);
    }
};

export const isLoggedIn = () => {
    return moment().isBefore(getExpiration(), "second");
};

export const isLoggedOut = () => {
    return !isLoggedIn();
};

export const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("expires");
};
