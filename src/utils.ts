/* eslint-disable no-useless-escape */

export function hasNumber(inputString: string): boolean {
  const regex = /[0-9]/;
  return regex.test(inputString);
}

export function hasUppercase(inputString: string): boolean {
  const regex = /[A-Z]/;
  return regex.test(inputString);
}

export function hasSpecialChar(inputString: string): boolean {
  const regex = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/;
  return regex.test(inputString);
}

export function hasNoConsecutiveLetters(inputString: string): boolean {
  const consecutiveLettersRegex = /[a-zA-Z]{2}/;
  return !consecutiveLettersRegex.test(inputString);
}
