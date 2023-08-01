export interface IUser{
    FirstName: string,
    LastName: string
    Tasks: ITodo[]
    Id: string
    userName: string,
    normalizedUserName: string,
    email: string,
    normalizedEmail: string
    emailConfirmed: boolean,
    passwordHash: string,
    securityStamp: string,
    concurrencyStamp: string,
    phoneNumber: number,
    phoneNumberConfirmed: boolean,
    twoFactorEnabled: boolean,
    lockoutEnd: any,
    lockoutEnabled: boolean,
    accessFailedCount: number
}

export interface ITodo{
    id: number,
    description: string,
    isCompleted: boolean,
    user?: IUser,
    userId: string
}

export interface ITodoDto{
    description: string
    isCompleted: boolean
    id: number
}