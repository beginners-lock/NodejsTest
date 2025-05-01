import jwt from 'jsonwebtoken';

export function createKeys(email: string){
    const accessToken = jwt.sign({ email }, process.env.ACCESS_TOKEN!, { expiresIn: '60s' });
    const refreshToken = jwt.sign({ email }, process.env.REFRESH_TOKEN!, { expiresIn: '7d' });

    return { accessToken, refreshToken };
}