import axios from "axios";
import "dotenv/config";

export const sendTelegramMessage = async (msg: any) => {
    try {
        console.log("TELEGRAM!!!!!!!");
        console.log({ msg });

        let str = `%0Auri: ${msg.uri} %0AchainId: ${msg.native.chainId}%0A<strong>tokenId</strong> ${msg.native.tokenId}%0A<strong>contract</strong> ${msg.native.contract}%0<strong>Aowner</strong> ${msg.native.owner}%0AcontractType ${msg.native.contractType}%0AcollName${msg.native.name}`
        await axios.get(`https://api.telegram.org/bot5649872974:AAHye96JTkXxrMfkg8FnM4hI30Z4q3xAt00/sendMessage?chat_id=-850284174&text=${str}&parse_mode=HTML`);
    } catch (err: any) {
        console.log(err)
    }
}