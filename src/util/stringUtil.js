import jsSHA from "jssha";
import Identicon from "identicon.js";

export function checkStringNotNull(s) {
    return s !== null && s !== undefined && s !== '';
}

export function username2IdenticonString(username) {
    const shaObj = new jsSHA("SHA-224", "TEXT", { encoding: "UTF8" });
    shaObj.update(username);
    const hash = shaObj.getHash("HEX");
    return new Identicon(hash, 420).toString()
}
