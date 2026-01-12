import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import SurveyField from "./SurveyField";
import { FIELDS } from "./const";


const recipientsSchema = z
    .string()
    .min(1, "Recipient list is required")
    .refine((value) => {
        const emails = value
            .split(",")
            .map((e) => e.trim())
            .filter(Boolean);

        if (emails.length === 0) return false;

        return emails.every((email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email));
    }, "Enter a comma separated list of valid emails");

const surveySchema = z.object({
    title: z.string().min(1, "Title is required"),
    subject: z.string().min(1, "Subject line is required"),
    body: z.string().min(1, "Email body is required"),
    recipients: recipientsSchema,
});

const SurveyForm = () => {

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(surveySchema),
        defaultValues: {
            title: "",
            subject: "",
            body: "",
            recipients: "",
        },
        mode: "onSubmit",
    });

    const onSubmit = (data) => {
        console.log('submitted', data);
    }

    const renderFields = () => {
        return (
            <div>
                {FIELDS.map((field) => (
                    <SurveyField
                        key={field.name}
                        label={field.label}
                        name={field.name}
                        register={register}
                        type='text'
                        errors={errors[field.name]}
                    />
                ))}
            </div>
        )
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {renderFields()}
            <button type="submit" disabled={isSubmitting}>{isSubmitting ? "Submitting..." : "Submit"}</button>
        </form>
    )
}

export default SurveyForm