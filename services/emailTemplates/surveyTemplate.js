import { redirectDomain } from '../../config/keys.js';

const emailTemplate = (survey) => {
  return `
    <html>
      <body>
        <div style="text-align: center;">
          <h3>I'd like your input!</h3>
          <p>Please answer the following question:</p>
          <p>Subject: ${survey.body}</p>

          <div style="margin-top: 30px;">
            <a
              href="${redirectDomain.domain}/api/surveys/${survey.id}/yes"
              style="
                display: inline-block;
                margin-right: 15px;
                text-decoration: none;
                color: white;
                background-color: #28a745;
                padding: 12px 24px;
                border-radius: 5px;
                font-weight: bold;
              "
            >
              Yes
            </a>

            <a
              href="${redirectDomain.domain}/api/surveys/${survey.id}/no"
              style="
                display: inline-block;
                text-decoration: none;
                color: white;
                background-color: #dc3545;
                padding: 12px 24px;
                border-radius: 5px;
                font-weight: bold;
              "
            >
              No
            </a>
          </div>
        </div>
      </body>
    </html>
  `;
};

export default emailTemplate;