import { message } from "antd";
import { useState, useReducer, useCallback } from "react";
import { API_METHODS } from "../constants";
import { isEmpty, replaceNull } from "../generalFunctions";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:4000/api"; //
//const API_URL = "https://pflege.webthoughts.in/api";

let authToken = localStorage.getItem("authToken");

const dataFetchReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_INIT":
      return { ...state, isLoading: true, isError: false };
    case "FETCH_SUCCESS":
      return replaceNull(action.payload.result);
    case "FETCH_FAILURE":
      return action.payload.result;
    default:
      return null;
  }
};

const getDataApiOptions = (method, requestBody, authorization, isImage) => {
  let options = {
    method: method,
    headers: !isImage
      ? {
          ...{
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: authorization,
          },
        }
      : {
          ...{
            Authorization: authorization,
          },
        },
  };
  if (requestBody) {
    options.body = !isImage ? JSON.stringify(requestBody) : requestBody;
  }
  return options;
};

const useApi = (apiPath, body, method, isImage) => {
  const navigate = useNavigate();
  let options = getDataApiOptions(method, body, authToken, isImage);
  const [url] = useState(API_URL + apiPath);

  const [state, dispatch] = useReducer(dataFetchReducer, {
    isLoading: null,
    data: null,
    request: body,
  });

  const callApi = useCallback(
    async (body, newMethod, newAPIPath) => {
      let APIUrl = url;
      if (newAPIPath) {
        APIUrl = API_URL + newAPIPath;
      }

      if (newMethod) {
        method = newMethod; // eslint-disable-line
      }

      let didCancel = false;
      if (body) {
        options.body = JSON.stringify(body);
      }
      if (method === API_METHODS.GET) {
        options.body = null;
      }

      if (isEmpty(options.authToken)) {
        authToken = localStorage.getItem("authToken");
        options = getDataApiOptions(method, body, authToken, isImage);
      }
      options.method = method;
      dispatch({ type: "FETCH_INIT" });

      const fetchRequest = new Request(APIUrl, options);

      try {
        let response = await fetch(fetchRequest);
        let status = response.status;
        let result = null;

        if (status !== 204) {
          result = await response.json();
        }

        if (!didCancel) {
          if (status === 401) {
            navigate("/");
            localStorage.clear();
          }
          if (!isEmpty(result.error)) {
            message.error(result.error);
            dispatch({
              type: "FETCH_FAILURE",
              payload: { result, status, isLoading: false, isError: true },
            });
          } else {
            dispatch({
              type: "FETCH_SUCCESS",
              payload: { result, status, isLoading: false, isError: false },
            });
          }
        }
      } catch (error) {
        if (!didCancel) {
          dispatch({ type: "FETCH_FAILURE", payload: error });
        }
      }

      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    [url, state && state.request]
  );

  return [state, callApi];
};

export default useApi;
