export function uuidv4(): string {
  const variant = ['8', '9', 'a', 'b'][Math.floor(Math.random() * 4)];
  const result =
    generateRandomHexString(8) +
    '-' +
    generateRandomHexString(4) +
    '-4' +
    generateRandomHexString(3) +
    '-' +
    variant +
    generateRandomHexString(3) +
    '-' +
    generateRandomHexString(12);

  return result.toLowerCase();
}

function generateRandomHexString(length: number): string {
  let result = '';
  for (let index = 0; index < length; index++) {
    const randomNumber = Math.floor(Math.random() * 16);
    result += randomNumber.toString(16);
  }
  return result;
}
