import brevo from '@getbrevo/brevo';
import 'dotenv/config';
import generateErrorsUtils from './generateErrorsUtils.js';

const {SMTP_API_KEY} = process.env;

const apiInstance = new brevo.TransactionalEmailsApi();

apiInstance.setApiKey(
    brevo.TransactionalEmailsApiApiKeys.apiKey,
    SMTP_API_KEY
);

const sendMailBrevoUtils = async (email, subject, body) => {
    try {
        
        const sendSmtpMail = new brevo.SendSmtpEmail();

        sendSmtpMail.subject = subject;

        sendSmtpMail.to = [
            { email: email }
        ];

        sendSmtpMail.htmlContent = body;

        sendSmtpMail.sender = {
            name: "Equipo de Diario de Viajes",
            email: "ismpascu43@gmail.com"
        };

        await apiInstance.sendTransacEmail(sendSmtpMail);

    } catch (error) {
        console.log(error);
        throw generateErrorsUtils('Error al enviar email...', 500);
    }
}

export default sendMailBrevoUtils;