export const validateEmailPass = (email, password) => {
  const isEmailValid = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
  const isPassValid = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password);

  if(!isEmailValid) return ("Invalid Email");
  if(!isPassValid) return ("Pasword must be 8 characters long and contain atleast one numeric, one lowercase and one uppercase character");
}
