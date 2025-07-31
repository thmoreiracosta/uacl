/**
 * Email validation
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Password strength validation
 * At least 8 characters, 1 uppercase, 1 lowercase, 1 number
 */
export const isStrongPassword = (password: string): boolean => {
  const minLength = password.length >= 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);

  return minLength && hasUppercase && hasLowercase && hasNumber;
};

/**
 * Get password strength feedback
 */
export const getPasswordStrength = (password: string): {
  score: number; // 0-4
  feedback: string;
} => {
  if (!password) {
    return { score: 0, feedback: 'Senha é obrigatória' };
  }

  let score = 0;
  let feedback = '';

  // Length check
  if (password.length < 6) {
    feedback = 'Senha muito curta';
  } else if (password.length < 8) {
    score += 1;
    feedback = 'Senha fraca, use pelo menos 8 caracteres';
  } else {
    score += 2;
  }

  // Complexity checks
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecial = /[^A-Za-z0-9]/.test(password);

  if (hasUppercase) score += 0.5;
  if (hasLowercase) score += 0.5;
  if (hasNumber) score += 0.5;
  if (hasSpecial) score += 0.5;

  // Final score and feedback
  if (score >= 4) {
    feedback = 'Senha forte';
  } else if (score >= 3) {
    feedback = 'Senha boa';
  } else if (score >= 2) {
    feedback = 'Senha razoável';
  } else {
    feedback = 'Senha fraca';
  }

  return {
    score: Math.min(4, Math.floor(score)),
    feedback,
  };
};

/**
 * Brazilian CPF validation
 */
export const isValidCPF = (cpf: string): boolean => {
  // Remove non-digits
  const cleanCPF = cpf.replace(/\D/g, '');

  // Check if it has 11 digits
  if (cleanCPF.length !== 11) {
    return false;
  }

  // Check if all digits are the same
  if (/^(\d)\1+$/.test(cleanCPF)) {
    return false;
  }

  // Validate first check digit
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cleanCPF.charAt(i), 10) * (10 - i);
  }
  const remainder = sum % 11;
  const checkDigit1 = remainder < 2 ? 0 : 11 - remainder;

  if (parseInt(cleanCPF.charAt(9), 10) !== checkDigit1) {
    return false;
  }

  // Validate second check digit
  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cleanCPF.charAt(i), 10) * (11 - i);
  }
  const remainder2 = sum % 11;
  const checkDigit2 = remainder2 < 2 ? 0 : 11 - remainder2;

  return parseInt(cleanCPF.charAt(10), 10) === checkDigit2;
};

/**
 * Brazilian CEP (postal code) validation
 */
export const isValidCEP = (cep: string): boolean => {
  const cepRegex = /^\d{5}-?\d{3}$/;
  return cepRegex.test(cep);
};

/**
 * Brazilian phone number validation
 */
export const isValidPhone = (phone: string): boolean => {
  // Remove non-digits
  const cleanPhone = phone.replace(/\D/g, '');

  // Check if it's a valid length for Brazilian phones
  return cleanPhone.length >= 10 && cleanPhone.length <= 11;
};

/**
 * URL validation
 */
export const isValidURL = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

/**
 * Date validation (check if it's a valid date)
 */
export const isValidDate = (dateString: string): boolean => {
  const date = new Date(dateString);
  return !isNaN(date.getTime());
};

/**
 * Check if user is of legal age (18 years or older)
 */
export const isLegalAge = (birthDate: string): boolean => {
  const today = new Date();
  const birth = new Date(birthDate);

  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }

  return age >= 18;
};

/**
 * Form field validation
 */
export const validateField = (
  field: string,
  value: string,
  required: boolean = true
): { isValid: boolean; message: string } => {
  // Check if required field is empty
  if (required && (!value || value.trim() === '')) {
    return { isValid: false, message: 'Este campo é obrigatório' };
  }

  // If not required and empty, it's valid
  if (!required && (!value || value.trim() === '')) {
    return { isValid: true, message: '' };
  }

  // Field-specific validations
  switch (field) {
    case 'email': {
      const valid = isValidEmail(value);
      return {
        isValid: valid,
        message: valid ? '' : 'Email inválido',
      };
    }

    case 'password': {
      const valid = isStrongPassword(value);
      return {
        isValid: valid,
        message: valid
          ? ''
          : 'A senha deve ter pelo menos 8 caracteres, uma letra maiúscula, uma minúscula e um número',
      };
    }

    case 'cpf': {
      const valid = isValidCPF(value);
      return {
        isValid: valid,
        message: valid ? '' : 'CPF inválido',
      };
    }

    case 'cep': {
      const valid = isValidCEP(value);
      return {
        isValid: valid,
        message: valid ? '' : 'CEP inválido',
      };
    }

    case 'phone': {
      const valid = isValidPhone(value);
      return {
        isValid: valid,
        message: valid ? '' : 'Telefone inválido',
      };
    }

    case 'url': {
      const valid = isValidURL(value);
      return {
        isValid: valid,
        message: valid ? '' : 'URL inválida',
      };
    }

    case 'birthDate': {
      const valid = isValidDate(value);
      if (!valid) {
        return { isValid: false, message: 'Data inválida' };
      }
      if (!isLegalAge(value)) {
        return { isValid: false, message: 'É necessário ter pelo menos 18 anos' };
      }
      return { isValid: true, message: '' };
    }

    default:
      return { isValid: true, message: '' };
  }
};
