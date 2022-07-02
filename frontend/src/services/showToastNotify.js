import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export function showToast(status) {
    if (sessionStorage.getItem(sessionStorage.key(0))) {
        toast[status](sessionStorage.getItem(sessionStorage.key(0)));
        sessionStorage.removeItem(sessionStorage.key(0));
      }
}