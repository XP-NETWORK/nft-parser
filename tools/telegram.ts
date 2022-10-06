import axios from "axios";
import "dotenv/config";

export const sendTelegramMessage = async (msg:any) => {
    try {
        await axios.get(`https://api.telegram.org/bot5649872974:AAHye96JTkXxrMfkg8FnM4hI30Z4q3xAt00/sendMessage?chat_id=-850284174&text=${msg}`);
    } catch (err:any) {
        console.log(err.message)
    }
}