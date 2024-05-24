/**
 * Checks if the given value is defined.
 *
 * @param value - The value to be checked.
 *
 * @returns {boolean} True if the value is not undefined, False if otherwise (i.e. if the value is undefined).
 */
export function isDefined<TValue>(value: TValue | undefined): value is TValue {
  return value !== undefined;
}
