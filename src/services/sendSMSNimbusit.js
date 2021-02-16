import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const Msg = process.env.MSG;
const EntityID = process.env.ENTITYID;
const Password = process.env.PASSWORD;
const SenderID = process.env.SENDERID;
const UserID = process.env.USERID;
const TextType = process.env.TEXTTYPE;
const Format = process.env.FORMAT;

const sendSMSJsonAPI = async (receiverPhone, userName, code) => axios.get(`http://nimbusit.biz/api/SmsApi/SendSingleApi?FORMAT=${Format}&UserID=${UserID}&Password=${Password}&SenderID=${SenderID}&TEXTTYPE=${TextType}&Msg=${userName} ${Msg} ${code}&Phno=${receiverPhone}`);
const sendSMSHTTPAPI = async (receiverPhone, userName, code) => axios.get(`http://nimbusit.biz/api/SmsApi/SendSingleApi?UserID=${UserID}&Password=${Password}&SenderID=${SenderID}&Phno=${receiverPhone}&Msg=${userName} ${Msg} ${code}&EntityID=${EntityID}`);

export { sendSMSJsonAPI, sendSMSHTTPAPI };
