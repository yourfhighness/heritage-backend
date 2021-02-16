import Twilio from 'twilio';
import dotenv from 'dotenv';

dotenv.config();
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = new Twilio(accountSid, authToken);

const sendSMS = async (receiverPhone, code) => {
  const sentSMS = await client.messages.create({
    body: `Hello !! Your Heritage verification code is:  ${code}`,
    from: process.env.FROM,
    to: receiverPhone,
  });
  return sentSMS;
};

export default sendSMS;
