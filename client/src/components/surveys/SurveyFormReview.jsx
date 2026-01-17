import { connect } from "react-redux"
import { submitSurvey } from "../../actions"
import { FIELDS } from "./const"


const SurveyFormReview = ({ formValues, onCancel }) => {

    const renderFields = () => {
        return FIELDS.map((field, index) => {
            return (
                <div key={index}>
                    <label>{field.label}</label>
                    <div>{formValues[field.name]}</div>
                </div>
            )
        })
    }

    return (
        <div>
            <h5>Please review and confirm your entries</h5>
            <div>
                {renderFields()}
            </div>
            <button className="yellow btn-flat left white-text btn-pad" onClick={onCancel}>
                Back to Edit
                <i className="material-icons right">arrow_back</i>
            </button>
            <button
                className="green btn-flat right white-text btn-pad"
                onClick={submitSurvey(formValues)}
                type="submit"
            >
                Send Survey
                <i className="material-icons right">email</i>
            </button>
        </div>
    )
}

export default connect(null, { submitSurvey })(SurveyFormReview)