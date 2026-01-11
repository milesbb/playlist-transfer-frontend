import { InputHTMLAttributes } from "react";

interface FormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  placeholder?: string;
}

export default function FormField({
  label,
  placeholder,
  ...props
}: FormFieldProps) {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 text-sm mb-1">{label}</label>
      <input
        placeholder={placeholder}
        {...props}
        className="w-full px-4 py-2 text-gray-900 border-b-2 border-gray-300 focus:border-blue-500 focus:outline-none transition-colors placeholder-gray-400  hover:bg-gray-50"
      />
    </div>
  );
}
