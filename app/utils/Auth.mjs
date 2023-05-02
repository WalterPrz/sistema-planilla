import jwt from "jsonwebtoken";
import { v4 as uuid } from "uuid";
import moment from "moment-timezone";
import RefreshToken from "../models/RefreshToken.mjs";
export default class Auth {
  static async createToken(PAYLOAD, KEY) {
    return new Promise((resolve, reject) => {
      jwt.sign(
        PAYLOAD,
        KEY,
        {
          expiresIn: process.env.JWT_EXPIRATION_TIME,
        },
        (err, token) => {
          if (err) reject(err);
          else resolve(token);
        }
      );
    });
  }
  static async refresh_token(user) {
    const REFRESH_TOKEN = uuid();
    const result = await RefreshToken.create({
      refresh_token: REFRESH_TOKEN,
      id_usuario: user.id_usuario,
      valid: moment()
        .add(
          process.env.REFRESH_EXPIRATION_TIME,
          process.env.REFRESH_EXPIRATION_TYPE
        )
        .tz("America/El_Salvador")
        .format(),
    });
    return result.refresh_token;
  }
}
