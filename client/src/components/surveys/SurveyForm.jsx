import { useForm } from "react-hook-form";
import { Link } from 'react-router-dom';
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
                        error={errors[field.name]}
                    />
                ))}
            </div>
        )
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {renderFields()}
            <Link className="red btn-flat left white-text" to="/surveys">
                Cancel
                <i className="material-icons right">close</i>
            </Link>
            <button
                className="teal btn-flat right white-text"
                disabled={isSubmitting}
                type="submit"
            >
                {isSubmitting ? "Submitting..." : "Submit"}
                <i className="material-icons right">done</i>
            </button>
        </form>
    )
}

export default SurveyForm