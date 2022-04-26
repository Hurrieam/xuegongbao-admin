import { keys } from "@/constant/keys";

export default function checkLogin() {
  return localStorage.getItem(keys.USER_STATUS) === 'login';
}
