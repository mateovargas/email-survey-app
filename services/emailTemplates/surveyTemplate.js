import { redirectDomain } from '../../config/keys.js';

const emailTemplate = (survey) => {
    return `
    <html>
      <body>
        <div style="text-align: center;">
          <h3>I'd like your input!</h3>
          <p>Please answer the following question:</p>
          <p>Subject: ${survey.body}</p>
          <div>
            <a href="${redirectDomain.domain}/api/surveys/thanks" style="margin: 20px; text-decoration: none; color: white; background-color: #28a745; padding: 10px 20px; border-radius: 5px;">Yes</a>
          </div>
          <div>
            <a href="${redirectDomain.domain}/api/surveys/thanks" style="margin: 20px; text-decoration: none; color: white; background-color: #dc3545; padding: 10px 20px; border-radius: 5px;">No</a>
          </div>
        </div>
      </body>
    </html>`;
}

export default emailTemplate;