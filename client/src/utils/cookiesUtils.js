export function setCookie  (name, value, day) {
    const date = new Date();
    date.setTime(date.getTime() + day * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value};expires=${date.toUTCString()};path=/`;
};

export function getCookie  (name) {
    const cookies = document.cookie.split("; ");
    const cookie = cookies.find((c) => c.startsWith(name + "="));
    console.log(cookie);
    return cookie ? cookie.split(name+"=")[1] : null;
  };
