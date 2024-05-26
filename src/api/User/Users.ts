import BaseModelAPI from "../BaseModelAPI";
import apiConfig from "../apiConfig";
import axiosClient from "../axiosClient";
import { API_USER_MODEL } from "./const";

class UserApiRequest extends BaseModelAPI {
    constructor() {
        super(API_USER_MODEL.url);
    }

    async loginVk<T>(body?: any) {
        return this.makeRequest<T>(axiosClient.get, {method: API_USER_MODEL.methods.loginVk.url, body: body});
    }
}

export default UserApiRequest;
