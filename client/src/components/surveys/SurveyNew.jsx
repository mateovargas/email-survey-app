import { useState } from 'react'

import SurveyForm from './SurveyForm'
import SurveyFormReview from './SurveyFormReview'

const SurveyNew = () => {

    const [showReview, setShowReview] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        subject: "",
        body: "",
        recipients: "",
    });

    return (
        <div>
            {showReview ?
                <SurveyFormReview formValues={formData} onCancel={() => setShowReview(false)} /> :
                <SurveyForm
                    defaultValues={formData}
                    onPersist={(data) => setFormData(data)}
                    onSurveySubmit={() => setShowReview(true)}
                />
            }
        </div>
    )
}

export default SurveyNew