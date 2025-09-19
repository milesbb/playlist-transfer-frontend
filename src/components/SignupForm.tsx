import { useState, FormEvent } from "react";
import { useAuth } from "../context/AuthContext";
import DynamicForm, { FieldConfig } from "../components/DynamicForm";

export default function SignUpForm() {
  const { signup } = useAuth();
  const [loading, setLoading] = useState(false);

  const [formValues, setFormValues] = useState({
    email: "",
    username: "",
    password: "",
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signup({
        email: formValues.email,
        username: formValues.username,
        password: formValues.password,
      });
    } finally {
      setLoading(false);
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
        onSubmit={handleSubmit}
        loading={loading}
        submitLabel="Sign Up"
      />
    </div>
  );
}
