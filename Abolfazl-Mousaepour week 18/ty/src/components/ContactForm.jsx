import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { contactSchema } from "../utils/validation";

const ContactForm = ({ onSubmit, defaultValues, isEditing }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(contactSchema),
    defaultValues
  });

  const submitHandler = (data) => {
    onSubmit(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <input
        type="text"
        {...register("name")}
        placeholder="نام و نام خانوادگی"
      />
      {errors.name && <p className="error-text">{errors.name.message}</p>}

      <input
        type="email"
        {...register("email")}
        placeholder="ایمیل"
      />
      {errors.email && <p className="error-text">{errors.email.message}</p>}

      <input
        type="tel"
        {...register("phone")}
        placeholder="شماره تلفن"
      />
      {errors.phone && <p className="error-text">{errors.phone.message}</p>}

      <button type="submit">
        {isEditing ? "✏️ ویرایش مخاطب" : "➕ افزودن"}
      </button>
    </form>
  );
};

export default ContactForm;