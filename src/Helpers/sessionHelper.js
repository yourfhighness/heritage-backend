import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import models from '../database/models';

dotenv.config();
const { FarmerSession } = models;

class SessionHelpers {
  static async sessionExist(attribute, value) {
    const session = await FarmerSession.findOne({ where: { [attribute]: value } });
    return session;
  }

  static async saveSession(farmerId, farmerName, session) {
    await FarmerSession.create({
      farmerId,
      farmerName,
      session,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  static async generateSession(farmerId, farmerName, userCode, phone, isVerified) {
    const farmerSessionExist = await this.sessionExist('farmerId', farmerId);

    if (farmerSessionExist) {
      return farmerSessionExist.session;
    }

    const generatedSession = jwt.sign({ farmerId, farmerName, userCode, phone, isVerified }, process.env.SECRET_KEY);
    this.saveSession(farmerId, farmerName, generatedSession);
    return generatedSession;
  }

  static async decodedSession(session) {
    const generatedSession = await jwt.verify(session, process.env.SECRET_KEY);
    return generatedSession;
  }
}

export default SessionHelpers;
