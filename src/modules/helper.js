export const getAuthUserID = () => {
  if (localStorage.auth) {
    let auth = JSON.parse(localStorage.auth);
    if (auth && auth.prj === "nblPartner" && auth.userId) return auth.userId;
    return false;
  }
  return false;
};
export const getAuthAdminId = () => {
  if (localStorage.auth) {
    let auth = JSON.parse(localStorage.auth);
    if (auth && auth.adminId) return auth.adminId;
    return false;
  }
  return false;
};
export const getAuthType = () => {
  if (localStorage.auth) {
    let auth = JSON.parse(localStorage.auth);
    if (auth && auth.type) return auth.type;
    return false;
  }
  return false;
};
export const getAuthUserName = () => {
  if (localStorage.auth) {
    let auth = JSON.parse(localStorage.auth);
    if (auth && auth.userName) return auth.userName;
    return false;
  }
  return false;
};
export const getAuthRole = () => {
  if (localStorage.auth) {
    let auth = JSON.parse(localStorage.auth);
    if (auth && auth.role) return auth.role;
    return false;
  }
  return false;
};
export const getAuthCompany = () => {
  if (localStorage.auth) {
    let auth = JSON.parse(localStorage.auth);
    if (auth && auth.company) return auth.company;
    return false;
  }
  return false;
};
