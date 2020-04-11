import React, { FC, MouseEvent, ChangeEvent, FormEvent } from 'react';
// import clsx from 'clsx';

// import { Icon } from './icon';

// interface InputProps {
//   type?: 'text' | 'password' | 'email' | 'tel';
//   color?: 'primary' | 'info' | 'success' | 'warning' | 'danger';
//   size?: 'small' | 'normal' | 'medium' | 'large';
//   rounded?: boolean;
//   hovered?: boolean;
//   focused?: boolean;
//   loading?: boolean;
//   disabled?: boolean;
//   readonly?: boolean;
//   isStatic?: boolean;
//   iconLeft?: string;
//   iconRight?: string;
//   className?: string;
//   onClick?: (event: MouseEvent<HTMLElement>) => void;
//   onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
//   onBlur?: (event: FormEvent<HTMLInputElement>) => void;
//   placeholder?: string;
//   name?: string;
//   value?: string;
//   label?: string | boolean;
//   error?: string;
//   pattern?: string;
//   inputReference?: {
//     <T>(initialValue: T): React.MutableRefObject<T>;
//     <T>(initialValue: T | null): React.RefObject<T>;
//     <T = undefined>(): React.MutableRefObject<T | undefined>;
//   };
// }

// export const Input: FC<InputProps> = (properties: InputProps) => {
//   const {
//     type,
//     color,
//     size,
//     rounded,
//     hovered,
//     focused,
//     loading,
//     disabled,
//     readonly,
//     isStatic,
//     iconLeft,
//     iconRight,
//     className,
//     onClick,
//     onChange,
//     onBlur,
//     placeholder,
//     name,
//     value,
//     label,
//     error,
//     pattern,
//     inputReference,
//   } = properties;

//   const divClasses = clsx([
//     'control',
//     {
//       'has-icons-left': iconLeft,
//       'has-icons-right': iconRight,
//       [`is-${size}`]: size,
//     },
//   ]);

//   const inputClasses = clsx([
//     { className },
//     'input',
//     {
//       [`is-${color}`]: color,
//       [`is-${size}`]: size,
//       'is-rounded': rounded,
//       'is-hovered': hovered,
//       'is-focused': focused,
//       'is-loading': loading,
//       'is-static': isStatic,
//     },
//   ]);

//   const getLabel = (): string | undefined => {
//     if (typeof label === 'string') {
//       return label;
//     }
//     if (label && placeholder) {
//       return placeholder;
//     }
//     return undefined;
//   };

//   const isError = (): boolean => {
//     if (value && value !== '' && pattern) {
//       const patt = new RegExp(pattern);
//       return !patt.test(String(value).toLowerCase());
//     }
//     return false;
//   };

//   const Label = (): JSX.Element | null =>
//     getLabel ? <label className="label">{getLabel()}</label> : null;

//   const Error = (): JSX.Element | null =>
//     isError ? (
//       <p className="help is-danger" key="InputError">
//         {error}
//       </p>
//     ) : null;

//   const LeftIcon = (): JSX.Element | null =>
//     iconLeft ? <Icon position="left" icon={iconLeft} /> : null;

//   const RightIcon = (): JSX.Element | null =>
//     iconRight ? <Icon position="right" icon={iconRight} /> : null;

//   return (
//     <div className="field">
//       <Label />
//       <div className={divClasses}>
//         <input
//           className={inputClasses}
//           type={type}
//           disabled={disabled}
//           onClick={onClick}
//           onChange={onChange}
//           onBlur={onBlur}
//           placeholder={placeholder}
//           readOnly={readonly}
//           name={name}
//           defaultValue={value}
//           ref={inputReference}
//         />
//         <LeftIcon />
//         <RightIcon />
//         <Error />
//       </div>
//     </div>
//   );
// };

// Input.defaultProps = {
//   type: 'text',
// };
