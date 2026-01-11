import React, { FormEvent } from "react";
import Spinner from "./Spinner";
import HCaptcha from "@hcaptcha/react-hcaptcha";

export interface FieldConfig {
  name: string; // field key
  label: string;
  type?: "text" | "email" | "password" | "number";
  optional?: boolean;
  placeholder?: string;
}

interface DynamicFormProps<T> {
  fields: FieldConfig[];
  values: T;
  setValues: React.Dispatch<React.SetStateAction<T>>;
  setCaptchaToken: React.Dispatch<React.SetStateAction<string | null>>;
  onSubmit: (e: FormEvent) => void;
  loading?: boolean;
  submitLabel?: string;
}

const CAPTCHA_SITE_KEY = import.meta.env.VITE_CAPTCHA_SITE_KEY;

export default function DynamicForm<T>({
  fields,
  values,
  setValues,
  setCaptchaToken,
  onSubmit,
  loading = false,
  submitLabel = "Submit",
}: DynamicFormProps<T>) {
  return (
    <form onSubmit={onSubmit} className="w-full max-w-md space-y-4">
      {fields.map((field) => (
        <div key={field.name} className="mb-4">
          <label className="block text-gray-700 text-sm mb-1">
            {field.label}
          </label>
          <input
            type={field.type || "text"}
            placeholder={field.placeholder || field.label}
            value={(values as any)[field.name]}
            onChange={(e) =>
              setValues((prev) => ({ ...prev, [field.name]: e.target.value }))
            }
            required={!field.optional}
            className="w-full px-4 py-2 border-b-2 border-gray-300 text-gray-900 focus:border-blue-500 focus:outline-none transition-colors placeholder-gray-400 hover:bg-gray-50"
          />
        </div>
      ))}

      <HCaptcha
        sitekey={CAPTCHA_SITE_KEY}
        onVerify={(token) => setCaptchaToken(token)}
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition disabled:opacity-50 flex items-center justify-center"
      >
        {loading ? <Spinner size={20} /> : submitLabel}
      </button>
    </form>
  );
}
