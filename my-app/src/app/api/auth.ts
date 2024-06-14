import axios from "axios";
import { LoginUser, RegisterUser } from "../types/types";

const baseUrl = "http://localhost:5000";

export async function register(user : RegisterUser){
    await axios.post(`${baseUrl}/api/auth/register`, user , {withCredentials : true}).then((res) => console.log(res));
};

export async function signIn(user : LoginUser){
    await axios.post(`${baseUrl}/api/auth/login`, user , {withCredentials : true}).then((res) => console.log(res));
};