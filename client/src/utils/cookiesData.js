import Cookies from "js-cookie";
import {jwtDecode} from "jwt-decode";


export const getCookiesData = () => {
    const token = Cookies.get("jwtToken");
    if (token) {
        const decodedToken = jwtDecode(token);
        return {
            userId: decodedToken.id,
            userMail: decodedToken.email,
            role: decodedToken.role,
        };
    } else {
        return null;
    }
}