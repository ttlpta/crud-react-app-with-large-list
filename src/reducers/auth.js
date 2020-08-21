export const login = (global, dispatch, action) => ({
  auth: { ...global.auth, ...action }
});
