
export const setCookie = (cname,cvalue,exdays=365) => {
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

export const getCookie = (cname) => {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
}

export const getCookieConsentData = () => {
  const analytical = getCookie('enable-analytics');
  return {
    analytical: /true/i.test(analytical) || false
  };
}

export const setCookieConsentData = ({ analytical = false }) => {
  setCookie('enable-analytics', analytical ? "true" : "false" );
}

export const isConsentSaved = () => {
  return getCookie('enable-analytics') !== "";
}

export const clearConsentData = () => {
  setCookie('enable-analytics','');
}