import SurveyField from "./SurveyField";

const SurveyForm = () => {

    const onSubmit = () => {
        console.log('submitted');
    }

    const renderFields = () => {
        return (
            <div>
                <SurveyField />
            </div>
        )
    }

    return (
        <form onSubmit={onSubmit}>
            {renderFields()}
            <button type="submit">Submit</button>
        </form>
    )
}

export default SurveyForm