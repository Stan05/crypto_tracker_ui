export const formatNumber = (value, options = {}) => {
    if (value === null || value === undefined) return '-'; // Handle null/undefined
  
    const numValue = Number(value); // Convert to a number
    if (isNaN(numValue)) return value; // If not a valid number, return the original value
  
    const {
      precision = 10, // Default precision for regular numbers
      fixedThreshold = 1e-4, // Threshold below which numbers are displayed in fixed-point format
    } = options;
  
    // Use fixed-point notation for very small numbers to avoid scientific notation
    if (Math.abs(numValue) < fixedThreshold && numValue !== 0) {
      return numValue.toFixed(precision);
    }
  
    // Format as a regular number
    return numValue.toFixed(precision);
  };
  