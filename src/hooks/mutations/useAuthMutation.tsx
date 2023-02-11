import {useState} from "react";
import {login as loginApi, register as registerApi} from "@/api/authApi";
import useAuthContext from "@/store/authContext";
import {AuthCredentials} from "@/interfaces";
import useSocketContext from "@/store/socketContext";
import {setItemToLocalStorage} from "@/utils/localStorage";
import {useMutation} from "@tanstack/react-query";
import errorHandler from "@/utils/errorHandler";

interface AuthMutation {
  values: AuthCredentials;
  type: "register" | "login";
}

const useAuthMutation = () => {
  const {login} = useAuthContext();
  const [error, setError] = useState("");
  const {socket} = useSocketContext();

  const {isLoading, mutate} = useMutation(
    ({values, type}: AuthMutation) => {
      return type === "register" ? registerApi(values) : loginApi(values);
    },
    {
      onSuccess: ({jwt, user}) => {
        // setting the user to local storage
        setItemToLocalStorage("user", user);
        setItemToLocalStorage("jwt", jwt);
        setItemToLocalStorage("isAuthenticated", true);

        // setting the user to the store
        login({jwt, user});

        // emit socket function
        socket.emit("login", user.id);
      },
      onError(error) {
        setError(errorHandler(error));
      },
    }
  );

  return {isLoading, mutate, error};
};

export default useAuthMutation;
