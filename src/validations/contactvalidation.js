import * as yup from "yup"

export const contactSchema = yup.object().shape({
    fullname : yup.string()
                  .required("نام و نام خانوادگی الزامیست"),
    photo : yup.string()
               .url("آدرس معتبر نیست")
               .required("تصویر مخاطب الزامیست") ,
    mobile : yup.string()
                .required("شماره موبایل الزامیست") ,
    email : yup.string()
                .email("آدرس ایمیل معتبر نیست")
                .required("ایمیل الزامیست"),
    job : yup.string()
             .nullable() ,
    group : yup.string()
               .required("انتخاب گروه الزامیست")
})