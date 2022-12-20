import PageHeader from "../common/pageHeader";
import Input from "../common/input";
import FormikUsingJoi from "../utils/formikusingjoi";
import Joi from "joi";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { updateCard } from "../service/cardService";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import useCard from "../hooks/useCard";

const EditCard = () => {
  const [error, setError] = useState();
  const navigate = useNavigate();
  const { id } = useParams();
  const card = useCard(id);

  useEffect(() => {
    if (!card) {
      return;
    }

    const {
      bizAddress,
      bizDescription,
      bizImage,
      bizName,
      bizNumber,
      bizPhone,
    } = card;

    form.setValues({
      bizAddress,
      bizDescription,
      bizImage,
      bizName,
      bizNumber,
      bizPhone,
    });
  }, [card]);

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
      console.log(values);
      const { bizImage, ...body } = values;
      if (bizImage) {
        body.bizImage = bizImage;
      }
      try {
        await updateCard(id, body);
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
            Edit card<i className="bi bi-google-play"></i>App
          </>
        }
        description="Edit you card"
      />

      <form noValidate autoComplete="off" onSubmit={form.handleSubmit}>
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
          Edit-card
        </button>
      </form>
    </>
  );
};
export default EditCard;
