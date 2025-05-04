export const getJwtUserCode = (jwtUserCode: string): string => {
  const value = process.env["JWT_USER_CODE"];
  if (!value) {
    throw new Error(`Environment variable ${jwtUserCode} is not defined`);
  }
  return value;
};
