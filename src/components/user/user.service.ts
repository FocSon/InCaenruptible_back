import { compare } from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '@config/config';
import User from '../../models/user.model';

const login = async (username: string, password: string) => {
  const user = await User.findOne({ where: { username } });
  if (user !== undefined && user !== null && await compare(password, user.password)) {
    const token = jwt.sign({ id: user.id }, config.jwtSecret, {
      expiresIn: '24h',
    });

    return { valid: true, token };
  }

  return { valid: false, token: '' };
};

export default {
  login,
};