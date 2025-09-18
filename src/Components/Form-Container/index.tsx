import type { ReactNode } from "react";

type FormContainerProps = {
  children: ReactNode;
  className?: string;
};

const FormContainer: React.FC<FormContainerProps> = ({ children, className = "" }) => {
  return (
    <div className={`p-5 border border-gray-300 rounded-md ${className}`}>
      {children}
    </div>
  );
};

export default FormContainer;
