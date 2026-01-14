export interface AuthTranslations {
  login: {
    title: string;
    subtitle: string;
    clientButton: string;
    operatorButton: string;
  };
  clientLogin: {
    title: string;
    subtitle: string;
    securityNote: string;
    form: {
      emailLabel: string;
      passwordLabel: string;
      forgotPassword: string;
      submitButton: string;
    };
    errors: {
      invalidEmail: string;
      passwordLength: string;
      noAccount: string;
      emailNotFound: string;
      incorrectPassword: string;
    };
    noAccount: string;
    createAccount: string;
  };
  forgotPassword: {
    title: string;
    subtitle: string;
    form: {
      emailLabel: string;
      submitButton: string;
    };
    errors: {
      invalidEmail: string;
    };
    success: {
      title: string;
      message: string;
      backToLogin: string;
    };
    rememberPassword: string;
    loginLink: string;
  };
  clientRegister: {
    title: string;
    subtitle: string;
    securityNote: string;
    form: {
      emailLabel: string;
      passwordLabel: string;
      confirmPasswordLabel: string;
      submitButton: string;
    };
    passwordStrengthLabel: string;
    passwordStrength: {
      weak: string;
      medium: string;
      strong: string;
    };
    passwordMatch: string;
    passwordMismatch: string;
    errors: {
      invalidEmail: string;
      passwordLength: string;
      accountExists: string;
    };
    haveAccount: string;
    loginLink: string;
  };
}
