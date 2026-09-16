/**
 * Shared Indian Rupee (INR / ₹) Currency and Number Formatter
 * Formats numbers into Indian numbering system (e.g. ₹1,29,900, ₹1,199, ₹1,299.50).
 */

export function formatINR(value: number | string | undefined | null): string {
  if (value === undefined || value === null || value === '') {
    return '₹0';
  }

  let numericValue: number;

  if (typeof value === 'number') {
    numericValue = value;
  } else {
    // Clean string by removing any existing currency symbols or commas
    const cleaned = value.replace(/[^0-9.-]/g, '');
    numericValue = parseFloat(cleaned);
    if (isNaN(numericValue)) {
      return value.startsWith('₹') ? value : `₹${value}`;
    }
  }

  // Check if number has non-zero decimals
  const hasDecimals = numericValue % 1 !== 0;

  const formattedNumber = new Intl.NumberFormat('en-IN', {
    maximumFractionDigits: hasDecimals ? 2 : 0,
    minimumFractionDigits: hasDecimals ? 2 : 0,
  }).format(numericValue);

  return `₹${formattedNumber}`;
}

export function parsePriceNumber(price: string | number | undefined | null): number {
  if (price === undefined || price === null || price === '') return 0;
  if (typeof price === 'number') return price;
  const cleaned = price.replace(/[^0-9.]/g, '');
  const parsed = parseFloat(cleaned);
  return isNaN(parsed) ? 0 : parsed;
}
