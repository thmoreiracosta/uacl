/**
 * Format a date string to a localized date format
 */
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
};

/**
 * Format a date string to a localized date and time format
 */
export const formatDateTime = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

/**
 * Format a number as currency (BRL)
 */
export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
};

/**
 * Format minutes to hours and minutes
 */
export const formatDuration = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  
  if (hours === 0) {
    return `${mins} minuto${mins !== 1 ? 's' : ''}`;
  }
  
  if (mins === 0) {
    return `${hours} hora${hours !== 1 ? 's' : ''}`;
  }
  
  return `${hours} hora${hours !== 1 ? 's' : ''} e ${mins} minuto${mins !== 1 ? 's' : ''}`;
};

/**
 * Format a phone number to Brazilian format
 */
export const formatPhoneNumber = (phone: string): string => {
  // Remove non-numeric characters
  const cleaned = phone.replace(/\D/g, '');
  
  // Check if it's a valid Brazilian phone number
  if (cleaned.length === 11) {
    // Mobile number with area code
    return `(${cleaned.substring(0, 2)}) ${cleaned.substring(2, 7)}-${cleaned.substring(7, 11)}`;
  } else if (cleaned.length === 10) {
    // Landline with area code
    return `(${cleaned.substring(0, 2)}) ${cleaned.substring(2, 6)}-${cleaned.substring(6, 10)}`;
  }
  
  // Return original if not matching expected formats
  return phone;
};

/**
 * Format a CPF number
 */
export const formatCPF = (cpf: string): string => {
  // Remove non-numeric characters
  const cleaned = cpf.replace(/\D/g, '');
  
  if (cleaned.length !== 11) {
    return cpf;
  }
  
  return `${cleaned.substring(0, 3)}.${cleaned.substring(3, 6)}.${cleaned.substring(6, 9)}-${cleaned.substring(9, 11)}`;
};

/**
 * Format a CEP (Brazilian postal code)
 */
export const formatCEP = (cep: string): string => {
  // Remove non-numeric characters
  const cleaned = cep.replace(/\D/g, '');
  
  if (cleaned.length !== 8) {
    return cep;
  }
  
  return `${cleaned.substring(0, 5)}-${cleaned.substring(5, 8)}`;
};

/**
 * Truncate text with ellipsis
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) {
    return text;
  }
  
  return text.substring(0, maxLength) + '...';
};

/**
 * Format file size
 */
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

/**
 * Format a percentage
 */
export const formatPercentage = (value: number): string => {
  return `${Math.round(value)}%`;
};

/**
 * Format a name to show only first and last name
 */
export const formatShortName = (fullName: string): string => {
  const names = fullName.split(' ').filter(Boolean);
  
  if (names.length <= 1) {
    return fullName;
  }
  
  return `${names[0]} ${names[names.length - 1]}`;
};
