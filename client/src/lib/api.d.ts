export interface SignUpDTO {
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  gender: string;
  major: string;
  academicYear: string;
  interests: string;
  password: string;
}

export interface LoginDTO {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}

// Based on the /api/v1/auth/me endpoint which returns a string
export type CurrentUserResponse = string;

// Function declarations that match the API contract
// POST /api/v1/auth/signup
export function signup(data: SignUpDTO): Promise<string>;

// POST /api/v1/auth/signin
export function login(data: LoginDTO): Promise<LoginResponse>;

// PUT /api/v1/auth/activate-account/{id}
export function activateAccount(id: number): Promise<string>;

// GET /api/v1/auth/me
export function getCurrentUser(): Promise<CurrentUserResponse>;

// The logout function is not defined in your API docs.
// I've included it as a placeholder for a logical frontend action.
export function logout(): void;