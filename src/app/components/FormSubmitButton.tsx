"use client";

import { ComponentProps } from "react";

import ReactDom from "react-dom";

const useFormStatus = (
  ReactDom as any as {
    experimental_useFormStatus: () => {
      pending: boolean;
      data: FormData | null;
      method: "get" | "post" | null;
      action: ((formData: FormData) => Promise<void>) | null;
    };
  }
).experimental_useFormStatus;

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
