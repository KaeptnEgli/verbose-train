// // PasswordInput.tsx
// //import withValidation from "./WithValidation";
// //import Input from "./Input";

// const requiredValidator = (value?: string) =>
//   !value ? "Required" : undefined;
// const minLengthValidator = (value?: string) =>
//   value && value.length < 8 ? "Too short" : undefined;
// const difficultyValidator = (value?: string) =>
//   value && !/^(?=.*\d)(?=.*[A-Za-z]).*$/.test(value)
//     ? "Must contain at least one number and letter"
//     : undefined;


// const BityAccountRules = withValidation(Input, [
//   requiredValidator,
//   minLengthValidator,
//   difficultyValidator
// ]);
// export default BityAccountRules;