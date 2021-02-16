import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import models from '../database/models';

dotenv.config();
const { FarmerSession, DoctorSession, AdminSession } = models;

class SessionHelpers {
  static async farmerSessionExist(attribute, value) {
    const session = await FarmerSession.findOne({ where: { [attribute]: value } });
    return session;
  }

  static async saveFarmerSession(farmerId, farmerName, session) {
    await FarmerSession.create({
      farmerId,
      farmerName,
      session,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  static async generateFarmerSession(farmerId, farmerName, userCode, phone, isVerified) {
    const SessionExist = await this.farmerSessionExist('farmerId', farmerId);

    if (SessionExist) {
      return SessionExist.session;
    }

    const generatedSession = jwt.sign({ farmerId, farmerName, userCode, phone, isVerified }, process.env.SECRET_KEY);
    this.saveFarmerSession(farmerId, farmerName, generatedSession);
    return generatedSession;
  }

  // #################################################################################################

  static async doctorSessionExist(attribute, value) {
    const session = await DoctorSession.findOne({ where: { [attribute]: value } });
    return session;
  }

  static async saveDoctorSession(doctorId, doctorName, session) {
    await DoctorSession.create({
      doctorId,
      doctorName,
      session,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  static async generateDoctorSession(doctorId, doctorName, email, phone, status) {
    const doctorSessionExist = await this.doctorSessionExist('doctorId', doctorId);

    if (doctorSessionExist) {
      return doctorSessionExist.session;
    }

    const generatedSession = jwt.sign({ doctorId, doctorName, email, phone, status }, process.env.SECRET_KEY);
    this.saveDoctorSession(doctorId, doctorName, generatedSession);
    return generatedSession;
  }

  // #################################################################################################

  static async adminSessionExist(attribute, value) {
    const session = await AdminSession.findOne({ where: { [attribute]: value } });
    return session;
  }

  static async saveAdminSession(adminId, adminName, session) {
    await AdminSession.create({
      adminId,
      adminName,
      session,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  static async generateAdminSession(adminId, adminName, email, phone, status) {
    const adminSessionExist = await this.adminSessionExist('adminId', adminId);

    if (adminSessionExist) {
      return adminSessionExist.session;
    }

    const generatedSession = jwt.sign({ adminId, adminName, email, phone, status }, process.env.SECRET_KEY);
    this.saveAdminSession(adminId, adminName, generatedSession);
    return generatedSession;
  }

  // #################################################################################################

  static async decodedSession(session) {
    const generatedSession = await jwt.verify(session, process.env.SECRET_KEY);
    return generatedSession;
  }
}

export default SessionHelpers;
