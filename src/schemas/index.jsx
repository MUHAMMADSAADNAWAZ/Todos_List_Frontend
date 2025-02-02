import * as Yup from 'yup'

export const todoSchema = Yup.object({
    title : Yup.string().min(2).required("Atleast 2 character title is required"),
    description : Yup.string().min(10).required("Atleast 10 letters escription is required")
})