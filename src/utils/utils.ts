export function validateInt(value: any, name: string): Error | null {
  if (Number.isNaN(parseInt(value))) {
    let message = `${name} "${
      value != null ? value.toString() : value
    }" is not an integer`;
    console.log(message);
    return new Error(message);
  }

  return null;
}
