type FormatNumberOptions = {
  decimalDigits?: number;
  locale?: string;
};

export const formatNumber = (
  value: number,
  options: FormatNumberOptions = {},
): string => {
  const { decimalDigits = 2, locale = "en-US" } = options;

  return new Intl.NumberFormat(locale, {
    minimumFractionDigits: decimalDigits,
    maximumFractionDigits: decimalDigits,
  }).format(value);
};
