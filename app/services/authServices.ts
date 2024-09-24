import { getCookie } from "cookies-next";

interface FlattenedObject {
  [key: string]: any;
}

export const isRunningInServer = typeof window === "undefined";

// Client only
// GetUICookie - reading cookie on the client side is a little tricky
// This is a function that makes it easy.
// Simple pass the cookie variable eg. GetUIcookie("isAuthenticated")
export const GetUIcookie = (cname: string = ""): string => {
  if (isRunningInServer) return "";
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
};

// Client only
// Define a function to set a UI cookie
// Call the function to set a UI cookie setUICookie("myCookie", "cookieValue", 7);
// Set a cookie named "myCookie" with value "cookieValue" that expires in 7 days
// Extend this to set domain as well for now path=/ is fine.
export const SetUICookie = (name: string, value: string, days: number) => {
  if (isRunningInServer) return "";
  var expires = "";
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
};

export const DeleteAllCookies = () => {
  if (isRunningInServer) return;
  const date = new Date();
  const expires = `;expires=${date.toUTCString()}`;
  var cookies = document.cookie.split(";");
  for (var i = 0; i < cookies.length; i++) {
    var cookie = cookies[i];
    var eqPos = cookie.indexOf("=");
    var name = eqPos > -1 ? cookie.substring(0, eqPos) : cookie;
    document.cookie = name + "=" + expires + "; path=/";
  }
};




const getServerCookie = (cookieName: string) => {
  return getCookie(cookieName);
};

