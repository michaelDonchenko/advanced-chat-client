import axios from "axios";

const errorHandler = (error: unknown): string => {
  let message = "";

  if (axios.isAxiosError(error) && error.response) {
    let errorMessage = null;
    if (error.response.data) {
      errorMessage = error.response.data.message;
    }

    return (message = errorMessage ? errorMessage : "Unknown error from BE");
  }

  if (error instanceof Error) {
    return (message = error.message);
  }

  return (message = "something went wrong! " + String(error));
};

export default errorHandler;
