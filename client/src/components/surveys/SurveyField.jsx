import React from 'react'

const SurveyField = ({ label, name, type = 'text', register, error }) => {
    return (
        <div>
            <label>{label}</label>
            <input type={type} {...register(name)} />
            {error?.message && (<div className="error"><span>{error.message}</span></div>)}
        </div>
    )
}

export default SurveyField