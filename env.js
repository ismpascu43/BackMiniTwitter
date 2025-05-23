import 'dotenv/config';

export const {
    MYSQL_HOST,
    MYSQL_USER,
    MYSQL_PASSWORD,
    MYSQL_DATABASE,
    MYSQL_PORT,

    SMTP_HOST,
    SMTP_PORT,
    SMTP_USER,
    SMTP_PASS,

    SMTP_API_KEY,

    SECRET,

    UPLOAD_DIR,
    PORT
} = process.env;
