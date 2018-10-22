interface DefaultResponse {
    data?: string;
    isError: boolean;
    errorMessage?: string;
}

export interface IEmailQueryResponse {
    emails?: Array<string>;
}

export interface IEmailJobQueueResponse {
}

export interface IEmailJobQueueRequest {
    to_emails: Array<string>;
    subject: string;
    email_text: string;
}