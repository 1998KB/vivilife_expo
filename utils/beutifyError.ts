export const toPascalCase = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

export const beautifyError = (error: any) => {
  console.log(error);
  return toPascalCase(error.code.replace("auth/", "").replaceAll("-", " "));
};
