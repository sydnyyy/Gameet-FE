export const EmailVerifyType = {
  SIGN_UP: "sign-up",
  RESET_PASSWORD: "password-reset",
} as const;

export type EmailVerifyType = (typeof EmailVerifyType)[keyof typeof EmailVerifyType];