import {StorageKey} from "@/constant/keys";
import storage from "@/utils/storage";

export default function checkLogin() {
    return storage.getItem(StorageKey.USER_STATUS) === "login";
}
