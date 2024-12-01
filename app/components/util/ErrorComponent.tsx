import { ReactElement } from "react";
import { FaExclamationCircle } from "react-icons/fa";

function ErrorComponent({
  title,
  children,
}: {
  title: string;
  children: ReactElement;
}) {
  return (
    <div className="error">
      <div className="icon">
        <FaExclamationCircle />
      </div>
      <h2>{title}</h2>
      {children}
    </div>
  );
}

export default ErrorComponent;
