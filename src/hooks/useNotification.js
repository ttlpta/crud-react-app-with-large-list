import React, { useDispatch } from "reactn";

import { notificationReducer } from "../reducers";

export default () => {
  const showNotification = useDispatch(notificationReducer.show);

  const showError = msg => {
    console.error(msg);
    showNotification({
      type: "error",
      show: true,
      message: msg
    });
  };

  const showSuccess = msg => {

    showNotification({
      type: "success",
      show: true,
      message: msg
    });
  };

  return { showError, showSuccess };
};
