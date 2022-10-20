import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function Toastify(status, message) {
  if (message) {
    switch (status) {
      case "error":
        toast.error(message);
        break;
      case "success":
        toast.success(message);
        break;
      case "info":
        toast.info(message);
        break;
    }
  }
}
