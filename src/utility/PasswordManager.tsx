import Utf8 from "crypto-js/enc-utf8";
import AES from "crypto-js/aes";

const PasswordManager = class {
  secureKey: string = "";

  constructor() {
    this.secureKey = import.meta.env.VITE_APP_SECRET_KEY; // put your own key here instead of getFingerprint() | process.env.REACT_APP_SECURE_LOCAL_STORAGE_HASH_KEY
  }

  /**
   * Function to encrypt data
   * @param value
   * @returns
   */
  encrypt(value: string) {
    return AES.encrypt(value, this.secureKey).toString();
  }

  /**
   * Function to decrypt data
   * @param value
   * @returns
   */
  decrypt(value: string) {
    try {
      var bytes = AES.decrypt(value, this.secureKey);
      return bytes.toString(Utf8) || null;
    } catch (ex) {
      return null;
    }
  }

  // Compare password
  comparePassword(password: string, encryptedPassword: string) {
    return this.encrypt(password) === encryptedPassword;
  }
};

export { PasswordManager };
