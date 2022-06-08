import {ElMessage} from "element-plus";

export const setCookie = (name = '', value = '', hour = 1) => {
    let d = new Date();
    d.setTime(d.getTime() + (hour * 60 * 60 * 1000));
    let expires = "expires=" + d.toGMTString();
    document.cookie = name + "=" + value + "; " + expires;
}
export const getCookie = (cname) => {
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i].trim();
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
export const copyToClipboard = (value) => {
    navigator.clipboard.writeText(value).then(() => {
        ElMessage.success('已复制到剪切板')
    });
}