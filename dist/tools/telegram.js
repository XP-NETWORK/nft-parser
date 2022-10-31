"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendTelegramMessage = void 0;
const axios_1 = __importDefault(require("axios"));
require("dotenv/config");
const sendTelegramMessage = (msg) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("TELEGRAM!!!!!!!");
        let str = `%0Auri: ${msg.uri} %0A<strong>chainId: ${msg.native.chainId}%0AtokenId ${msg.native.tokenId}%0Acontract ${msg.native.contract}%owner ${msg.native.owner}%0AcontractType ${msg.native.contractType}%0AcollName${msg.native.name}</strong>`;
        yield axios_1.default.get(`https://api.telegram.org/bot5649872974:AAHye96JTkXxrMfkg8FnM4hI30Z4q3xAt00/sendMessage?chat_id=-850284174&text=${str}&parse_mode=HTML`);
    }
    catch (err) {
        console.log(err.message);
    }
});
exports.sendTelegramMessage = sendTelegramMessage;
