
import * as Yup from 'yup'

export const equipmentSchema=Yup.object({
    name:Yup.string().required("name is required"),
    quantity:Yup.number().required('quantity is required'),
    image: Yup.string(),
    description:Yup.string().required("add any description about this equipment")
})