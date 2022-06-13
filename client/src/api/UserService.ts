import axios from "axios";

export default class UserService {
    static async getCurrentUser() {
        const token = localStorage.getItem('Token');
        return axios.get('http://localhost:8000/user/', {
            headers: {
                'Authorization': `Token ${token}`
            }
        })
    }

    static async loginUser(email: string, password: string) {
        const candidate = {
            user: {email, password}
        }
        return await axios.post('http://127.0.0.1:8000/users/login', candidate);
    }
}
