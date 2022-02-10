export interface TokenInfo{
    iat: number,
    exp: number,
    sub: string,
    email: string
}

export interface UserInfo{
    id: number,
    profileImgUrl:string,
    email:string
}