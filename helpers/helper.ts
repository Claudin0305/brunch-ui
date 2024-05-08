export const replaceSpecialChars = (email: string) => {
  email = email.replace(/[àâåāáạǎăä]/gi, "a").replace(/[éêè]/gi, "e");

  return email;
};
