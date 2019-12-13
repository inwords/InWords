export default function getWordEnding(n) {
  const end = n % 10;

  if (end === 0 || end >= 5) {
    return '';
  }
  if (end !== 1) {
    return 'а';
  }

  return 'о';
}
