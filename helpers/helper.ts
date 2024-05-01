export const replaceSpecialChars = (email: string) => {
  email = email
    .replace(/[áâãäåàÀÁÂÃÅ]/gi, "a")
    .replace(/[ÈÉÊËèëêé]/gi, "e")
    .replace(/[ÌÍÎÏìíîï]/gi, "i")
    .replace(/[ÔÕÖÒÓöõôóò]/, "o")
    .replace(/[ùúûüŨũŪūŬŭŮůŰű]/, "u");
  return email;
};
