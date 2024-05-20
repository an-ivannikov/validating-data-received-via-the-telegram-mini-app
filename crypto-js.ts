import CryptoJS from "crypto-js";



const TELEGRAM_BOT_TOKEN = "6887590696:AAEf6UL8lV5qhveK_dFNEOtjLTosCrErM8Q";
const INIT_DATA = "user=%7B%22id%22%3A308131758%2C%22first_name%22%3A%22ALEX%22%2C%22last_name%22%3A%22IVANNIKOV.PRO%22%2C%22username%22%3A%22ivannikovPro%22%2C%22language_code%22%3A%22ru%22%2C%22allows_write_to_pm%22%3Atrue%7D&chat_instance=-1857114464680496286&chat_type=private&auth_date=1716232213&hash=7d31991a605ab5e265b40ebbccc09c28bfb59366d2ac5cee9ca288c24a2ed3c3";


export const verifyTelegramWebAppData = (telegramInitData: string): boolean => {
  const initData = new URLSearchParams(telegramInitData);
  const hash = initData.get("hash");
  const dataToCheck: string[] = [];

  initData.sort();
  initData.forEach((val, key) => key !== "hash" && dataToCheck.push(`${key}=${val}`));

  const secret = CryptoJS.HmacSHA256(TELEGRAM_BOT_TOKEN, "WebAppData");
  const _hash = CryptoJS.HmacSHA256(dataToCheck.join("\n"), secret).toString(CryptoJS.enc.Hex);

  return hash === _hash;
}

console.log(verifyTelegramWebAppData(INIT_DATA));
