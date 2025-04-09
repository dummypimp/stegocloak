/**
 * Error handling utility for StegCloak frontend application
 * Provides standardized error handling, formatting, and logging
 */

// Define error types/codes as enum for consistent reference
export enum ErrorCode {
  // General errors
  UNKNOWN_ERROR = 'UNKNOWN_ERROR',
  NETWORK_ERROR = 'NETWORK_ERROR',
  
  // Input validation errors
  INVALID_INPUT = 'INVALID_INPUT',
  EMPTY_SECRET = 'EMPTY_SECRET',
  EMPTY_PASSWORD = 'EMPTY_PASSWORD',
  EMPTY_COVER_TEXT = 'EMPTY_COVER_TEXT',
  EMPTY_STEGO_TEXT = 'EMPTY_STEGO_TEXT',
  
  // StegCloak specific errors
  INITIALIZATION_ERROR = 'INITIALIZATION_ERROR',
  ENCRYPTION_ERROR = 'ENCRYPTION_ERROR',
  DECRYPTION_ERROR = 'DECRYPTION_ERROR',
  WRONG_PASSWORD = 'WRONG_PASSWORD',
  INTEGRITY_ERROR = 'INTEGRITY_ERROR',
  
  // Client-side errors
  CLIENT_SIDE_ONLY = 'CLIENT_SIDE_ONLY',
  BROWSER_UNSUPPORTED = 'BROWSER_UNSUPPORTED'
}

// Interface for structured error objects
export interface ErrorType {
  code: ErrorCode;
  message: string;
  details?: unknown;
  timestamp?: Date;
}

// Log levels for different severities
export enum LogLevel {
  INFO = 'info',
  WARN = 'warn',
  ERROR = 'error',
  DEBUG = 'debug'
}

/**
 * Creates a standardized error object
 */
export function createError(
  code: ErrorCode, 
  message?: string, 
  details?: unknown
): ErrorType {
  return {
    code,
    message: message || getDefaultErrorMessage(code),
    details,
    timestamp: new Date()
  };
}

/**
 * Returns a user-friendly error message based on error code
 */
export function getDefaultErrorMessage(code: ErrorCode): string {
  switch (code) {
    case ErrorCode.UNKNOWN_ERROR:
      return 'An unknown error occurred.';
    case ErrorCode.NETWORK_ERROR:
      return 'Network error. Please check your connection.';
    case ErrorCode.INVALID_INPUT:
      return 'Invalid input provided.';
    case ErrorCode.EMPTY_SECRET:
      return 'Secret message cannot be empty.';
    case ErrorCode.EMPTY_PASSWORD:
      return 'Password cannot be empty.';
    case ErrorCode.EMPTY_COVER_TEXT:
      return 'Cover text cannot be empty.';
    case ErrorCode.EMPTY_STEGO_TEXT:
      return 'Stego text cannot be empty.';
    case ErrorCode.INITIALIZATION_ERROR:
      return 'Failed to initialize StegCloak.';
    case ErrorCode.ENCRYPTION_ERROR:
      return 'Failed to encrypt your message.';
    case ErrorCode.DECRYPTION_ERROR:
      return 'Failed to decrypt the message.';
    case ErrorCode.WRONG_PASSWORD:
      return 'Incorrect password. Please try again.';
    case ErrorCode.INTEGRITY_ERROR:
      return 'Message integrity check failed.';
    case ErrorCode.CLIENT_SIDE_ONLY:
      return 'This feature is only available in the browser.';
    case ErrorCode.BROWSER_UNSUPPORTED:
      return 'Your browser may not support all features.';
    default:
      return 'An error occurred.';
  }
}

/**
 * Logs an error with specified severity level
 */
export function logError(
  error: ErrorType | Error | string,
  level: LogLevel = LogLevel.ERROR
): void {
  // Format the error for logging
  let formattedError: ErrorType;
  
  if (typeof error === 'string') {
    formattedError = createError(ErrorCode.UNKNOWN_ERROR, error);
  } else if (error instanceof Error) {
    formattedError = createError(ErrorCode.UNKNOWN_ERROR, error.message, {
      stack: error.stack,
      name: error.name
    });
  } else {
    formattedError = error;
  }
  
  // Add timestamp if not present
  if (!formattedError.timestamp) {
    formattedError.timestamp = new Date();
  }
  
  // Log based on level
  const logMsg = `[${formattedError.timestamp.toISOString()}] [${formattedError.code}]: ${formattedError.message}`;
  
  switch (level) {
    case LogLevel.INFO:
      console.info(logMsg, formattedError.details || '');
      break;
    case LogLevel.WARN:
      console.warn(logMsg, formattedError.details || '');
      break;
    case LogLevel.DEBUG:
      console.debug(logMsg, formattedError.details || '');
      break;
    case LogLevel.ERROR:
    default:
      console.error(logMsg, formattedError.details || '');
  }
  
  // In a production app, you might want to send errors to a monitoring service
  // Example: sendToMonitoringService(formattedError);
}

/**
 * Handles an error by logging it and returning a user-friendly message
 */
export function handleError(
  error: unknown, 
  defaultCode: ErrorCode = ErrorCode.UNKNOWN_ERROR
): string {
  let errorToHandle: ErrorType;
  
  // Convert the unknown error to our ErrorType format
  if (typeof error === 'string') {
    errorToHandle = createError(defaultCode, error);
  } else if (error instanceof Error) {
    errorToHandle = createError(defaultCode, error.message, {
      stack: error.stack,
      name: error.name
    });
  } else if (error && typeof error === 'object' && 'code' in error && 'message' in error) {
    // If it already has a code and message property, assume it's our ErrorType
    errorToHandle = error as ErrorType;
  } else {
    errorToHandle = createError(defaultCode, 'An unexpected error occurred.', error);
  }
  
  // Log the error
  logError(errorToHandle);
  
  // Return user-friendly message
  return errorToHandle.message;
}

/**
 * Validates that required fields are present
 */
export function validateRequiredFields(fields: Record<string, string | undefined>): ErrorType | null {
  for (const [key, value] of Object.entries(fields)) {
    if (!value || value.trim() === '') {
      let code: ErrorCode;
      
      switch (key.toLowerCase()) {
        case 'secret':
          code = ErrorCode.EMPTY_SECRET;
          break;
        case 'password':
          code = ErrorCode.EMPTY_PASSWORD;
          break;
        case 'covertext':
        case 'cover':
          code = ErrorCode.EMPTY_COVER_TEXT;
          break;
        case 'stegotext':
        case 'stego':
          code = ErrorCode.EMPTY_STEGO_TEXT;
          break;
        default:
          code = ErrorCode.INVALID_INPUT;
      }
      
      return createError(code, `${key} cannot be empty.`);
    }
  }
  
  return null;
}

/**
 * Utility to map StegCloak service errors to our error codes
 */
export function mapStegCloakError(errorMessage: string): ErrorCode {
  const lowerCaseError = errorMessage.toLowerCase();
  
  if (lowerCaseError.includes('password')) {
    return ErrorCode.WRONG_PASSWORD;
  } else if (lowerCaseError.includes('integrity') || lowerCaseError.includes('hmac')) {
    return ErrorCode.INTEGRITY_ERROR;
  } else if (lowerCaseError.includes('encrypt')) {
    return ErrorCode.ENCRYPTION_ERROR;
  } else if (lowerCaseError.includes('decrypt')) {
    return ErrorCode.DECRYPTION_ERROR;
  } else if (lowerCaseError.includes('initialize')) {
    return ErrorCode.INITIALIZATION_ERROR;
  } else if (lowerCaseError.includes('client side')) {
    return ErrorCode.CLIENT_SIDE_ONLY;
  }
  
  return ErrorCode.UNKNOWN_ERROR;
}

