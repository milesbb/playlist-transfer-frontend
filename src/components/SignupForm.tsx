import { useState, FormEvent, useRef, RefObject } from "react";
import { useAuth } from "../context/AuthContext";
import DynamicForm, { FieldConfig } from "../components/DynamicForm";
import { toast } from "react-hot-toast";
import HCaptcha from "@hcaptcha/react-hcaptcha";

export default function SignUpForm() {
  const { signup } = useAuth();
  const [loading, setLoading] = useState(false);

  const [formValues, setFormValues] = useState({
    email: "",
    username: "",
    password: "",
  });
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const captchaRef: RefObject<HCaptcha | null> = useRef(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if (typeof captchaToken !== "string") {
      toast.error("Please complete the captcha.");
      setLoading(false);
    } else {
      try {
        await signup(
          {
            email: formValues.email,
            username: formValues.username,
            password: formValues.password,
            captchaToken,
          },
          captchaRef,
          setCaptchaToken
        );
      } finally {
        setLoading(false);
      }
    }
  };

  const fields: FieldConfig[] = [
    {
      name: "email",
      label: "Email",
      type: "email",
      optional: false,
      placeholder: "Email",
    },
    {
      name: "username",
      label: "Username",
      type: "text",
      optional: false,
      placeholder: "Username",
    },
    {
      name: "password",
      label: "Password",
      type: "password",
      optional: false,
      placeholder: "Password",
    },
  ];

  return (
    <div className="flex items-center justify-center bg-transparent">
      <DynamicForm
        fields={fields}
        values={formValues}
        setValues={setFormValues}
        setCaptchaToken={setCaptchaToken}
        onSubmit={handleSubmit}
        captchaRef={captchaRef}
        loading={loading}
        submitLabel="Sign Up"
      />
    </div>
  );
}
