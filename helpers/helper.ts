export const replaceSpecialChars = (email: string) => {
  email = email.replace(/[àâåāáạǎăä]/gi, "a").replace(/[éêèëè]/gi, "e").replace(/[ïîì]/gi, "i").replace(/[ùûÜ]/gi, "u").replace(/[òöôÖ]/gi, "o").replace(/[ÿ]/gi, "y");

  return email;
};
