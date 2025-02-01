import * as Yup from "yup";

export const volunteerSchema = Yup.object({
  name: Yup.string().required("Name is required"),

  gender: Yup.string().required("Please select gender"),

  phone: Yup.number()
    .typeError("Phone must be a number")
    .integer("Phone number must be an integer")
    .test(
      "len",
      "Phone number must be exactly 10 digits",
      (val) => val ? val.toString().length === 10 : false
    )
    .required("Phone is required"),

    image: Yup.mixed()
    .test("fileSize", "File size is too large (max 2MB)", (value) => {
      return value instanceof File ? value.size <= 2 * 1024 * 1024 : true;
    })
    .test("fileType", "Only images are allowed", (value) => {
      return value instanceof File
        ? ["image/jpeg", "image/png", "image/jpg"].includes(value.type)
        : true;
    }),
});
