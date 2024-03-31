import { FieldError, useForm } from "react-hook-form";
import { ValidationError } from "./ValidationError";
import { NewContactData } from "./types";

type Props = {
  onSave: (newContact: NewContactData) => void;
};

export function NewContactForm({ onSave }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<NewContactData>();
  const fieldStyle = "flex flex-col mb-2";
  function getEditorStyle(fieldError: FieldError | undefined) {
    return fieldError ? "border-red-500" : "";
  }
  return (
    <form noValidate className="border-b py-4" onSubmit={handleSubmit(onSave)}>
      <div className={fieldStyle}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          {...register("name", {
            required: "You must enter a name",
          })}
          className={getEditorStyle(errors.name)}
        />
        <ValidationError fieldError={errors.name} />
      </div>
      <div className={fieldStyle}>
        <label htmlFor="email">Email</label>
        <input
          type="text"
          id="email"
          {...register("email", {
            required: "You must enter the email",
          })}
          className={getEditorStyle(errors.email)}
        />
        <ValidationError fieldError={errors.email} />
      </div>
      <div className={fieldStyle}>
        <label htmlFor="phone">Phone</label>
        <input
          type="text"
          id="phone"
          {...register("phone", {
            required: "You must enter the phone",
          })}
          className={getEditorStyle(errors.phone)}
        />
        <ValidationError fieldError={errors.phone} />

        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-2 h-10 px-6 font-semibold bg-black text-white"
        >
          Save
        </button>
        {isSubmitSuccessful && (
          <div role="alert" className="text-green-500 text-xs mt-1">
            The contact was saved successfully
          </div>
        )}
      </div>
    </form>
  );
}
