import { ValidationErrorField } from '../shared/types/validation-error-field.type.js';
import { ValidationError } from 'class-validator';
import { ServiceError } from '../shared/types/service-error.enum.js';

export function createErrorObject(serviceError: ServiceError, message: string, details: ValidationErrorField[] = []) {
  return {
    errorType: serviceError,
    message,
    details: [...details],
  };
}

export function getErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : '';
}

export function transformErrors(errors: ValidationError[]): ValidationErrorField[] {
  return errors.map(({property, value, constraints}) => ({
    property,
    value,
    messages: constraints ? Object.values(constraints) : []
  }));
}
