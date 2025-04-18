export interface Profile {
  name: string;
  surname: string;
  email: string;
  favorites: string[];
}

export type Profiles = Profile | null;

export interface Registration {
  success?: boolean;
  error?: string;
}

export interface Login {
  result: boolean;
}

export interface FormData {
  email: string;
  name: string;
  surname: string;
  password: string;
  confirmPassword: string;
}
