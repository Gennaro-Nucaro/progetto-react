export interface IResRegister {
    success: boolean,
    msg: string,

}

export interface IResLogin {
    success: boolean,
    token: string,
    expiresIn: string,
    username: string,
    email: string,
    msg: string
}

export interface IResLoginError {
    success: boolean,
    msg: string
}
export interface IResCheck {
    success: boolean,
    msg: string,
    username: string,
    email: string
}

export interface IResDelete {
    success: boolean,
    msg: string,
}

export interface IUser {
    username: string,
    email?: string,
    password: string,

}
export interface IStateUser {
    username: string,
    email: string,
    loading: boolean,
    isSuccess: boolean,
    isError: boolean,
    message: string,
}