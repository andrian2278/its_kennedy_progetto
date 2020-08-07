export interface RegisterRequest
{
    username: string;
    password: string;
    email: string;
    firstName: string|null;
    lastName: string|null;
}