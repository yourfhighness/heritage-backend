import bcrypt from 'bcryptjs';

class HasherHelper {
  static hashPassword(password) {
    return bcrypt.hashSync(password, 10);
  }

  static checkPassword(plainPassword, hashedPassword) {
    return bcrypt.compareSync(plainPassword, hashedPassword);
  }

  static checkMasterPassword(plainPassword, hashedPassword) {
    return bcrypt.compareSync(plainPassword, hashedPassword);
  }
}

export default HasherHelper;
