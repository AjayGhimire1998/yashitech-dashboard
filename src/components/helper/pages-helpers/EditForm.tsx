// import * as React from "react";
// import LoginInputWrapper from "../login-helpers/LoginInputWrapper";
// import Attribute from "../../pages/home-page/Attribute";
// import { AttributeKey, FormTextArea } from "../../pages/styles";

// interface Props {
//   children?: React.ReactNode;
//   className?: string;
//   attrCount?: number;
//   names: Array<string>;
//   values: Array<any>;
//   formName?: string
//   onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
// }

// const EditForm: React.FunctionComponent<Props> = ({
//   className,
//   attrCount,
//   names,
//   values,
//   onChange,
//   formName,
//   children,
// }) => {
//   return (
//     <div className={className}>
//       <h3>{formName}</h3>
//       {[...Array(attrCount)].map((e, i) => (
//         <LoginInputWrapper key={i}>
//           <AttributeKey>{names[i]}</AttributeKey>
//           <FormTextArea
//             className={names[i] + "_input"}
//             onChange={onChange}
//             value={values[i]}
//           />
//         </LoginInputWrapper>
//       ))}
//     </div>
//   );
// };

export default {};
