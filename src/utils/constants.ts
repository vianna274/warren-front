export const ERROR_MESSAGES = {
  required: () => 'Campo obrigatório',
  max: (number: number) => `O campo deve ter no máximo ${number} caracteres`,
  min: (number: number) => `O campo deve ter no mínimo ${number} caracteres`,
  invalid: () => 'Campo inválido',
  invalidPayload: () => 'Invalid Payload',
};