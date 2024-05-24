export function convertCentAmountToLocalized(amount: number) {
  return `${(amount / 100).toFixed(2).replaceAll('.', ',')}€`;
}
