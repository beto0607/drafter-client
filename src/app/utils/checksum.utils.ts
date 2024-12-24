import { IProject } from '../domain';

export function getChecksum(project: IProject): string {
  const checksum = getStringFromValues(project);
  let sum = 0;
  for (let i = 0; i < checksum.length; i++) {
    sum += checksum.charCodeAt(i) * i;
  }
  return sum.toString(16);
}

function getStringFromValues(obj: object): string {
  let result = '';

  for (const v of Object.values(obj)) {
    if (Array.isArray(v)) {
      for (const item of v) {
        result += getStringFromValues(item);
      }
    } else if (typeof v === 'object') {
      result += getStringFromValues(v);
    } else {
      result += v?.toString() ?? '';
    }
  }

  return result;
}
