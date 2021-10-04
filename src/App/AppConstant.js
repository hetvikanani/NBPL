const FormValidation = {
  name: "Please enter Name",
  nameMin: "Please enter at least 3 characters.",
  emailRequired: "Email Is Required",
  messageRequired: "Message Is Required",
  emailInvalid: "Please enter valid email address.",
  sameuser: "Username already used. please change it.",
  mobileRequired: "Mobaile No. Is Required",
  mobileInvalid: "Please enter valid mobile number.",
  pinInvalid: "Only 6 character allowed.",
  passwordMin: "Password must be at least 6 characters",
  aadharInvalid: "Please enter 12 numbers.",
  passwordInvalid:
    "Must Contain One Uppercase, One Lowercase, One Number and One Special Case Character",
  repatePWD:
    "Both 'New Password' & 'Conform New Password' need to be the same.",
  alphaValid: "Only alphabets are allowed for this field",
  gstvalid: "Enter valid GST no.",
  panValid: "Enter valid pan no.",
  alphaNumValid:
    "Please enter only alphanumeric letters. Special characters are not allowed",
};
const pwdMatch =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$*#?&^_()[\]])[A-Za-z\d@$*#?&^_()[\]]{8,}$/;
const gstConst = /\d{2}[A-Z]{5}\d{4}[A-Z]{1}[A-Z\d]{1}[Z]{1}[A-Z\d]{1}/;
const panConst = /[A-Z]{5}\d{4}[A-Z]{1}/;
const ButtonConst = {
  next: "Next",
  cancel: "Cancel",
  save: "Save",
  add: "Add",
  edit: "Edit",
  submit: "Submit",
  delete: "Delete",
  download: "Download",
  answer: "Answer",
  decline: "Decline",
  Upload: "Upload",
  logout: "Logout",
  select: "Select",
  genLicence: "Generate Licence",
  payment: "Payment",
  updatePWD: "Update Password",
  update: "Update",
  search: "search...",
};
const ConfirmConst = {
  header: "Log out",
  message: "Are you sure you want to log-out?",
  yes: "Yes",
  no: "No",
};
const RemoveConst = {
  yes: "Yes",
  danger: "danger",
  no: "No ",
  header: "Delete ",
  que: " ?",
  logout: "Log-out",
  deleteMessage: "Are you sure you want to remove ",
  logMessage: "Are you sure you want to logout?",
  dropText: "Drop image here or click to browse file here",
};
const Months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "July",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
export {
  FormValidation,
  ButtonConst,
  ConfirmConst,
  RemoveConst,
  Months,
  gstConst,
  panConst,
  pwdMatch,
};
