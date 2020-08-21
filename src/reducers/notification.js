export const show = (global, dispatch, action) => ({
  notification: { ...global.notification, ...action }
});
