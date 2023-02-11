import axiosInstance from "./axiosInstance";
import {ConversationResponse, CreateContactResponse, GetContactsResponse} from "@/interfaces";
import {getItemFromLocalStorage} from "@/utils/localStorage";

const defaultHeaders = () => {
  return {
    Authorization: `Bearer ${getItemFromLocalStorage("jwt")}`,
    "Content-type": "application/json",
  };
};

export const getContacts = (): Promise<GetContactsResponse> =>
  axiosInstance.get("/contact", {headers: defaultHeaders()}).then((response) => response.data);

export const createContact = (username: string): Promise<CreateContactResponse> =>
  axiosInstance
    .post("/contact", {username}, {headers: defaultHeaders()})
    .then((response) => response.data);

export const getConversation = (id: number | null): Promise<ConversationResponse> =>
  axiosInstance
    .get(`/conversation/${id}`, {headers: defaultHeaders()})
    .then((response) => response.data);
