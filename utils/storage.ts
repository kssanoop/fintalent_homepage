import Cookies from "js-cookie";

const storage = {
  getDatafromCookie: (name: string) => {
    const cookieData = Cookies.get(name);
    if (cookieData) return JSON.parse(decodeURIComponent(cookieData));
    else return null;
  },

  getToken: (name: string) => {
    const token = storage.getDatafromCookie(name)?.token || null;
    console.log(token);
    return token;
    // try {
    // if (token) {
    //   return token;
    // }
    // } catch (err) {
    // console.error("invalid token: ", err);
    // return null;
    // }
  },

  getUser: (name: string) => {
    const userId = storage.getDatafromCookie(name)?.auth._id;
    if (userId) return userId;
  },

  getUserRole: (name: string) => {
    const role = storage.getDatafromCookie(name)?.auth.role;
    if (role) return role;
  },

  setCookieData: (name: string, data: string) => {
    Cookies.set(name, data, { expires: 7 });
  },

  clearCookies: (name: string) => {
    Cookies.remove(name);
  },
};

export default storage;
