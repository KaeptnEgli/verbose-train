// // PasswordInput.tsx
// //import withValidation from "./WithValidation";
// //import Input from "./Input";

// class BityAccountValidator {
//     account: string;
//     valiadte: boolean
  
//     constructor(account) {
//       this.account = account;
//     }
  
//     requiredValidator = (value?: string) => {
//       if (!value)
//         return false;
//     }
//     minLengthValidator = (value?: string) =>
//       value && value.length < 8 ? "Too short" : undefined;
//     difficultyValidator = (value?: string) =>
//       value && !/^(?=.*\d)(?=.*[A-Za-z]).*$/.test(value)
//         ? "Must contain at least one number and letter"
//         : undefined;
  
//   }