export interface User {
    email: string
    password: string
    roles: Roles
}

export type Roles = 'Admin' | 'Editor' | 'User'

/*export type RoleKeys = 'Admin' | 'Editor' | 'User'

export enum Roles {
    Admin = 'Admin',
    Editor = 'Editor',
    User = 'User'
}*/

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