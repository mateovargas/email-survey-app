import { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { Link } from 'react-router-dom';
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { FIELDS } from "./const";
import SurveyField from "./SurveyField";
import validateEmails from "../../utils/validateEmails";

import './Surveys.css';



const recipientsSchema = z
    .string()
    .min(1, "Recipient list is required")
    .refine((value) => {
        return validateEmails(value);
    }, "Enter a comma separated list of valid emails");

const surveySchema = z.object({
    title: z.string().min(1, "Title is required"),
    subject: z.string().min(1, "Subject line is required"),
    body: z.string().min(1, "Email body is required"),
    recipients: recipientsSchema,
});

const SurveyForm = ({ defaultValues, onPersist, onSurveySubmit }) => {

    const {
        register,
        handleSubmit,
        control,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(surveySchema),
        defaultValues,
        mode: "onSubmit",
    });

    const watchedValues = useWatch({ control });

    useEffect(() => {
        onPersist(watchedValues);
    }, [watchedValues, onPersist]);

    const onSubmit = (data) => {
        console.log('submitted', data);
        onSurveySubmit();
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
            <Link className="red btn-flat left white-text btn-pad" to="/surveys">
                Cancel
                <i className="material-icons right">close</i>
            </Link>
            <button
                className="teal btn-flat right white-text btn-pad"
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