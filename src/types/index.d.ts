interface User {
    email: string
    password: string
    roles: Role[]
}

type RoleKeys = 'Admin' | 'Editor' | 'User'

interface Role {
    [key: RoleKeys]: number
}

interface Employee{
    name: string
    gender: 'Male' | 'Female'
    salary: number
}