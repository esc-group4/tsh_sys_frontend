
// here we will do some kind of validation, check empty, check regex

interface ValidationResult {
    isValid: boolean;
    errors: {
      username?: string;
      password?: string;
    };
  }
  
  export const validateInputs = (username: string, password: string): ValidationResult => {
    const errors: ValidationResult['errors'] = {};
    let isValid = true;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
    if (!username.trim()) {
      isValid = false;
      errors.username = 'Username is required';
    } else if (!emailRegex.test(username)) {
      isValid = false;
      errors.username = 'Invalid email format';
    }
  
    if (!password.trim()) {
      isValid = false;
      errors.password = 'Password is required';
    }
  
    return { isValid, errors };
  };
  