
import * as Yup from 'yup'

export const equipmentSchema=Yup.object({
    name:Yup.string().required("name is required"),
    quantity:Yup.number().required('quantity is required'),
    image: Yup.mixed()
    .test("fileSize", "File size is too large (max 2MB)", (value) => {
      return value instanceof File ? value.size <= 2 * 1024 * 1024 : true;
    })
    .test("fileType", "Only images are allowed", (value) => {
      return value instanceof File
        ? ["image/jpeg", "image/png", "image/jpg"].includes(value.type)
        : true;
    })
    .required("Image is required"),
    description:Yup.string().required("add any description about this equipment")
})