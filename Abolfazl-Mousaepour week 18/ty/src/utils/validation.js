import * as Yup from "yup";

export const contactSchema = Yup.object().shape({
  name: Yup.string()
    .required("نام الزامی است")
    .min(7, "حداقل ۷ کاراکتر")
    .matches(/^[\u0600-\u06FFa-zA-Z\s]+$/, "نام فقط شامل حروف فارسی یا انگلیسی باشد"),

  email: Yup.string()
    .email("فرمت ایمیل معتبر نیست")
    .test("is-gmail", "فقط @gmail.com قابل قبول است", value =>
      value ? value.endsWith("@gmail.com") : false
    )
    .required("ایمیل الزامی است"),

  phone: Yup.string()
    .matches(/^\d{11}$/, "شماره باید دقیقاً ۱۱ رقم باشد")
    .required("شماره تماس الزامی است")
});