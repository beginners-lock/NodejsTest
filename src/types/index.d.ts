interface User {
    email: string
    password: string
    roles: Role[]
}

type RoleKeys = 'Admin' | 'Editor' | 'User'

type Role = Partial<Record<RoleKeys, number>>

/*interface Role {
    [key: RoleKeys]: number
}*/

interface Employee{
    name: string
    gender: 'Male' | 'Female'
    phone: string
    salary: number
}