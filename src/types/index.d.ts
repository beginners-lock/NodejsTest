export interface User {
    email: string
    password: string
    roles: Role[]
}

export type RoleKeys = 'Admin' | 'Editor' | 'User'

export type Role = Partial<Record<RoleKeys, number>>

/*interface Role {
    [key: RoleKeys]: number
}*/

export interface Employee{
    id: number
    name: string
    gender: 'Male' | 'Female'
    phone: string
    salary: string
}