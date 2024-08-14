import { BLANK_VALUE } from "./constants";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc.js"; // Import UTC plugin
import timezone from "dayjs/plugin/timezone.js"; // Import UTC plugin
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault("Asia/Kolkata");

export function replaceNull(jsonObject, replaceValue = BLANK_VALUE) {
  const replacedObject = (key, value) =>
    String(value) === "null" || String(value) === "undefined" || value === ""
      ? replaceValue
      : value;
  return JSON.parse(JSON.stringify(jsonObject, replacedObject));
}

export const setDataToLocalStorage = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const getDataFromLocalStorage = (key) => {
  return JSON.parse(localStorage.getItem(key));
};

export const isEmpty = (value) => {
  if (
    value === null ||
    value === undefined ||
    value === BLANK_VALUE ||
    value === ""
  ) {
    return true;
  }
  return false;
};

export const disableFutureDates = (current) => {
  return current && current.valueOf() > dayjs().tz("Asia/Kolkata").endOf("day");
};
