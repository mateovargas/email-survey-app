import { useEffect } from 'react'
import { connect } from 'react-redux'

import { fetchSurveys } from '../../actions'

const SurveyList = ({ fetchSurveys, surveys }) => {

    useEffect(() => {
        fetchSurveys()
    }, [fetchSurveys])

    const renderSurveys = () => {
        if (!surveys || surveys.length === 0) {
            return <div>No surveys available.</div>
        }

        return [...surveys].reverse().map((survey) => (
            <div className="card blue-grey" key={survey.id}>
                <div className="card-content white-text">
                    <span className="card-title">{survey.title}</span>
                    <p>{survey.body}</p>
                    <p className="right">
                        Sent On: {new Date(survey.dateSent).toLocaleDateString()}
                    </p>
                </div>
                <div className="card-action">
                    <a>Yes: {survey.yes}</a>
                    <a>No: {survey.no}</a>
                </div>
            </div>
        ))
    }

    return (
        <div>{renderSurveys()}</div>
    )
}

const mapStateToProps = (state) => {
    return { surveys: state.surveys }
}

export default connect(mapStateToProps, { fetchSurveys })(SurveyList)