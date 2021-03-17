import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const UserID = process.env.USERID;
const Password = process.env.PASSWORD;
const SenderID = process.env.SENDERID;
const Msg = process.env.MESSAGE;
const EntityID = process.env.ENTITYID;
const TemplateID = process.env.TEMPLATEID;

const sendSMSJsonAPI = async (phone, message) => axios.get(`http://nimbusit.biz/api/SmsApi/SendSingleApi?UserID=${UserID}&Password=${Password}&SenderID=${SenderID}&Phno=${phone}&Msg=${message}.&EntityID=${EntityID}&TemplateID=${TemplateID}`);
const sendSMSJsonAPIS = async (Phno, code) => axios.get(`http://nimbusit.biz/api/SmsApi/SendSingleApi?UserID=${UserID}&Password=${Password}&SenderID=${SenderID}&Phno=${Phno}&Msg=${Msg}${code}.&EntityID=${EntityID}&TemplateID=${TemplateID}`);

export { sendSMSJsonAPI, sendSMSJsonAPIS };
