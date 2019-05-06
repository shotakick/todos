import { compareSync, hashSync } from 'bcryptjs';
import jwt, { VerifyErrors } from 'jsonwebtoken';

const userSaveKey = 'todos:users';
const saltRounds = 10;
const jwtSecretKey = process.env.REACT_APP_JWT_SECRET_KEY || 'jwt_key';

export interface User {
  id: string;
  pass: string;
}

export const login = ({ id, pass }: User): Promise<{ token: string }> => {
  return new Promise(async (resolve, reject) => {
    const users: User[] = JSON.parse(localStorage[userSaveKey] || '[]');
    const user = users.find(user => user.id === id);

    if (user) {
      if (!pass || !compareSync(pass, user.pass)) reject(new Error('Invalid password'));
      const token = jwt.sign({ id }, jwtSecretKey);
      resolve({ token });
    } else {
      resolve(await signup({ id, pass }));
    }
  });
};

export const signup = ({ id, pass }: User): Promise<{ token: string }> => {
  return new Promise(async (resolve, reject) => {
    const users: User[] = JSON.parse(localStorage[userSaveKey] || '[]');
    if (users.find(user => user.id === id)) reject(new Error('User already exists'));

    const hash = pass && hashSync(pass, saltRounds);
    localStorage[userSaveKey] = JSON.stringify([...users, { id, pass: hash }]);

    const token = jwt.sign({ id }, jwtSecretKey);
    resolve({ token });
  });
};

export const authenticate = (token: string, id?: string): Promise<{ id: string }> => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, jwtSecretKey, (error: VerifyErrors, decoded: any) => {
      if (error) reject(error);
      if (id && id !== decoded.id) reject(new Error('Unmatched id'));
      resolve(decoded);
    });
  });
};
