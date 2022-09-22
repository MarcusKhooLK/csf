export interface RegistrationData {
    id?: string
    name: string
    email: string
}

export interface RegistrationResponse {
    code: number
    message?: string
    data?: string   
}