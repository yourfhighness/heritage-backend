import dotenv from 'dotenv';
import fetch from 'node-fetch';
import models from '../database/models';

dotenv.config();
const { Notification } = models;

class DoctorHelpers {
  static async notificationExist(attribute, value) {
    const data = await Notification.findOne({ where: { [attribute]: value } });
    return data;
  }

  static async viewNotifications(id, isRead, skip, start) {
    const data = await Notification.findAndCountAll({
      where: { id, isRead },
      offset: start,
      limit: skip,
    });

    return data;
  }

  static async saveNotification(farmerId, doctorId, notification, url) {
    await Notification.create({
      farmerId,
      doctorId,
      isRead: false,
      url,
      notification,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  static async updateNotification(isRead, id) {
    const data = await Notification.update({ isRead }, { where: { id } });
    return data;
  }

  static async sendNotification(receiverToken, farmerId, doctorId, message, url) {
    const data = { url };
    const fcmTokens = [receiverToken];
    const notification = { title: 'Heritage', body: message };
    const notificationBody = { notification, data, registration_ids: fcmTokens };

    fetch(process.env.FIREBASE_API, {
      method: 'POST',
      body: JSON.stringify(notificationBody),
      headers: { Authorization: 'key=AAAAA54Y4zo:APA91bEJb_HIRoLB46xLPeyeGGOOx8k-k8-GHtk77VgXI2c26QNqIhoCuCu4XN6crjiy4eyxjpMM95bksI_PMFkiETD94SL3lJgUj-qky2jn-O4Xo42vakJ0bA50p6qg8SvuNssA3gqq', 'Content-Type': 'application/json' },
    })
      .then(async (result) => {
        await this.saveNotification(farmerId, doctorId, message, url);
        return result;
      })
      .catch((err) => err);
  }
}

export default DoctorHelpers;
