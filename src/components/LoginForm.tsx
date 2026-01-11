import {
  useState,
  FormEvent,
  useRef,
  MutableRefObject,
  RefObject,
} from "react";
import { useAuth } from "../context/AuthContext";
import DynamicForm, { FieldConfig } from "../components/DynamicForm";
import { toast } from "react-hot-toast";
import HCaptcha from "@hcaptcha/react-hcaptcha";

const emailOptions: FieldConfig = {
  name: "email",
  label: "Email",
  type: "email",
  optional: true,
  placeholder: "Email",
};

const usernameOptions: FieldConfig = {
  name: "username",
  label: "Username",
  type: "text",
  optional: true,
  placeholder: "Username",
};

export default function LoginForm() {
  const { login } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);
  const [useEmail, setUseEmail] = useState<boolean>(false);

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
        await login(
          {
            email: useEmail ? formValues.email || undefined : undefined,
            username: !useEmail ? formValues.username || undefined : undefined,
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

  let fields: FieldConfig[] = [];

  if (useEmail) {
    fields.push(emailOptions);
  } else {
    fields.push(usernameOptions);
  }
  fields.push({
    name: "password",
    label: "Password",
    type: "password",
    optional: false,
    placeholder: "Password",
  });

  return (
    <div className="flex flex-col items-center justify-center bg-transparent">
      {/* Toggle */}
      <div className="flex items-center mb-4">
        <span
          onClick={() => setUseEmail(true)}
          style={
            useEmail
              ? { backgroundColor: "#c3a8bf" }
              : { backgroundColor: "#d1d5dc" }
          }
          className={"cursor-pointer px-3 py-1 rounded-l text-black"}
        >
          Email
        </span>
        <span
          onClick={() => setUseEmail(false)}
          style={
            !useEmail
              ? { backgroundColor: "#c3a8bf" }
              : { backgroundColor: "#d1d5dc" }
          }
          className={"cursor-pointer px-3 py-1 rounded-r text-black"}
        >
          Username
        </span>
      </div>

      <DynamicForm
        fields={fields}
        values={formValues}
        setValues={setFormValues}
        setCaptchaToken={setCaptchaToken}
        onSubmit={handleSubmit}
        captchaRef={captchaRef}
        loading={loading}
        submitLabel="Login"
      />
    </div>
  );
}
