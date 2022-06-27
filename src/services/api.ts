import axios from "axios";

const baseURL = "https://api.devgui.info";

export const api = axios.create({
	baseURL
});