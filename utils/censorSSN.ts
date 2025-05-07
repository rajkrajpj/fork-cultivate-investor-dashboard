export function censorSSN(ssn: string): string {
  if (!ssn) return 'N/A';
  return `XXX-XX-${ssn.slice(-4)}`;
}
