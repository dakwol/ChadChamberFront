import BaseModelAPI from "../BaseModelAPI";
import axiosClient from "../axiosClient";
import { API_EVENTS_MODEL } from "./const";

class EventsApiRequest extends BaseModelAPI {
    constructor() {
        super(API_EVENTS_MODEL.url);
    }
}

export default EventsApiRequest