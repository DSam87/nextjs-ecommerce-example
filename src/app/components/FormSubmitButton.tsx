"use client";

import { ComponentProps } from "react";
import { useFormStatus } from "react-dom";

interface FormSubmitButton extends ComponentProps<"button"> {
  children: React.ReactNode;
  className?: string;
}

function FormSubmitButton({ children, className }: FormSubmitButton) {
  const status = useFormStatus();

  return (
    <button disabled={status.pending} className={className} type="submit">
      {children}
    </button>
  );
}

export default FormSubmitButton;
