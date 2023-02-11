import {useMutation} from "@tanstack/react-query";
import {useState} from "react";
import {createContact} from "@/api/userApi";
import useModalContext from "@/store/modalContext";
import errorHandler from "@/utils/errorHandler";
import useContactsContext from "@/store/contactsContext";

const useAddContactMutation = () => {
  const {closeModal} = useModalContext();
  const {addContact} = useContactsContext();
  const [error, setError] = useState("");

  const {mutate, isLoading} = useMutation((username: string) => createContact(username), {
    onSuccess: (response) => {
      addContact(response.contact);
      closeModal();
    },
    onError: (error) => {
      setError(errorHandler(error));
    },
  });

  return {mutate, error, isLoading};
};

export default useAddContactMutation;
