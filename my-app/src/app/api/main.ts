import axios from "axios";
import { CreatePost } from "../types/types";

const baseUrl = "http://localhost:5000";

export async function addPost(post : CreatePost) {
    await axios.post(`${baseUrl}/api/posts` , post , {withCredentials : true}).then((res) => console.log(res));
};

export async function getAllPosts() {
    const posts = await axios.get(`${baseUrl}/api/posts`, {withCredentials : true});
    return posts.data;
};

export async function getAllMyPosts() {
    const posts = await axios.get(`${baseUrl}/api/posts/my-posts`, {withCredentials : true});
    return posts.data;
};

export async function deletePost(postId : string) {
    await axios.delete(`${baseUrl}/api/posts/${postId}` , {withCredentials : true}).then((res) => console.log(res));
};

export async function getUserName(postId : string) {
    const userName = await axios.get(`${baseUrl}/api/posts/username/${postId}` , {withCredentials : true});
    return userName.data;
};

export async function getUserInfos() {
    const response = await axios.get(`${baseUrl}/api/users/me`, { withCredentials: true });
    return response.data;
};

export async function getUserStats() {
    const response = await axios.get(`${baseUrl}/api/stats/user-posts`, { withCredentials: true });
    return response.data;
};

export async function logout() {
    await axios.post(`${baseUrl}/api/auth/logout`, {}, { withCredentials: true });
};

export async function getAllUsers() {
    const response = await axios.get(`${baseUrl}/api/users/all`, { withCredentials: true });
    return response.data;
};

