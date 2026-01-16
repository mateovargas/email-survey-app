import './Surveys.css';

const SurveyField = ({ label, name, type = 'text', register, error }) => {
    return (
        <div>
            <label>{label}</label>
            <input className="survey-input" type={type} {...register(name)} />
            {error?.message && (<div className="error red-text text-darken-2 err-msg"><span>{error.message}</span></div>)}
        </div>
    )
}

export default SurveyField