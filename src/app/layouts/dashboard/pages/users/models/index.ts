export type UserRole = 'ADMIN' | 'USER';

export interface IUser {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: UserRole;
    createdAt: Date;
}

export interface CreateUserPayload {
    firstName: string | null;
    lastName: string | null;
    email: string | null;
    role: UserRole | null;
    createdAt: Date | null;
}
