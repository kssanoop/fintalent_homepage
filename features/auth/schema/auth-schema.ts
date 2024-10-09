export interface loginSignUpSchema extends roleSchema {
  email: string;
  password: string;
  confirmPassword?: string;
  action?: "signin" | "signup";
}

export interface forgotPWSchema extends roleSchema {
  email: string;
}

export interface newPasswordSchema {
  newPassword: string;
  confirmPassword: string;
}

export interface roleSchema {
  role: "admin" | "candidate" | "teamlead" | "manager" | "recruiter";
}
