import * as jwt from 'jsonwebtoken';

export function generateTokens(user) {
  const payload = {
    name: user.name,
    email: user.email,
    id: user._id,
    company_id: user.company_id,
  };
  const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '1d',
  });
  const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET);

  return { accessToken, refreshToken };
}
