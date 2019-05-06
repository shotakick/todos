import * as server from '../services/auth';

const tokenKey = 'todos:token';

interface LoginParam {
  id: string;
  pass: string;
}

export const login = async (param: LoginParam): Promise<{ id: string }> => {
  const { token } = await server.login(param);
  saveToken(token);
  return param;
};

export const authenticate = async (): Promise<{ id: string }> => {
  const token = getToken();
  if (!token) throw new Error('Not authenticated');
  return await server.authenticate(token);
};

export const getToken = () => sessionStorage[tokenKey];
export const saveToken = (token: string) => (sessionStorage[tokenKey] = token);
