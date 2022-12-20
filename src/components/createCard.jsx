import PageHeader from "../common/pageHeader";
import Input from "../common/input";
import FormikUsingJoi from "../utils/formikusingjoi";
import Joi from "joi";
import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createCard } from "../service/cardService";
import { toast } from "react-toastify";

const CreateCard = () => {
  const [error, setError] = useState();
  const navigate = useNavigate();
  const form = useFormik({
    validateOnMount: true,
    initialValues: {
      bizName: "",
      bizDescription: "",
      bizAddress: "",
      bizPhone: "",
      bizImage: "",
    },
    validate: FormikUsingJoi({
      bizName: Joi.string().min(2).max(255).required().label("Name"),
      bizDescription: Joi.string()
        .min(2)
        .max(1024)
        .required()
        .label("Description"),
      bizAddress: Joi.string().min(2).max(400).required().label("Address"),
      bizPhone: Joi.string()
        .min(9)
        .max(10)
        .required()
        .regex(/^0[2-9]\d{7,8}$/)
        .label("Phone"),
      bizImage: Joi.string().min(11).max(1024).label("Image").allow(""),
    }),
    async onSubmit(values) {
      const { bizImage, ...body } = values;
      if (bizImage) {
        body.bizImage = bizImage;
      }
      try {
        await createCard(body);
        toast("your card is ready!");
        navigate("/my-cards");
      } catch ({ response }) {
        if (response && response.status === 400) {
          setError(response.data);
        }
      }
    },
  });
  return (
    <>
      <PageHeader
        title={
          <>
            create a card <i className="bi bi-google-play"></i>App
          </>
        }
        description="you can control everything"
      />

      <form onSubmit={form.handleSubmit}>
        {error && <div className="alert alert-danger">{error}</div>}

        <Input
          {...form.getFieldProps("bizName")}
          label="Name"
          type="text"
          required
          error={form.touched.bizName && form.errors.bizName}
        />
        <Input
          {...form.getFieldProps("bizDescription")}
          label="Description"
          type="text"
          required
          error={form.touched.bizDescription && form.errors.bizDescription}
        />
        <Input
          {...form.getFieldProps("bizAddress")}
          label="Address"
          type="text"
          required
          error={form.touched.bizAddress && form.errors.bizAddress}
        />
        <Input
          {...form.getFieldProps("bizPhone")}
          label="Phone"
          type="text"
          required
          error={form.touched.bizPhone && form.errors.bizPhone}
        />
        <Input
          {...form.getFieldProps("bizImage")}
          label="Image"
          type="text"
          error={form.touched.bizImage && form.errors.bizImage}
        />
        <button type="submit" className="btn btn-primary">
          create-card
        </button>
      </form>
    </>
  );
};
export default CreateCard;
