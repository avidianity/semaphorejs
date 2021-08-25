import { AxiosInstance } from 'axios';
export declare type ClientOptions = {
    senderName?: string;
    baseUrl?: string;
};
export declare type MessageResponse = {
    message_id: number;
    user_id: number;
    user: string;
    account_id: number;
    account: string;
    recipient: string;
    message: string;
    sender_name: string;
    network: string;
    status: 'Queued' | 'Pending' | 'Sent' | 'Failed' | 'Refunded';
    type: string;
    source: string;
    created_at: string;
    updated_at: string;
};
export declare type Account = {
    account_id: number;
    account_name: string;
    status: string;
    credit_balance: number;
};
export declare type SenderName = {
    name: string;
    status: string;
    created_at: string;
};
export declare type FetchMessagesOptions = {
    limit?: number;
    page?: number;
    startDate?: string;
    endDate?: string;
    status?: string;
    network?: string;
    sendername?: string;
};
export declare type User = {
    user_id: number;
    email: string;
    role: string;
    status?: string;
};
export declare class Client {
    protected axios: AxiosInstance;
    protected senderName: string;
    protected key: string;
    constructor(key: string, options?: ClientOptions);
    balance(): Promise<Account>;
    send(recipients: string | string[], message: string): Promise<MessageResponse[]>;
    message(messageId: string): Promise<MessageResponse>;
    messages(options?: FetchMessagesOptions): Promise<MessageResponse[]>;
    account(): Promise<Account>;
    users(): Promise<User[]>;
    senderNames(): Promise<SenderName[]>;
    transactions(): Promise<Account[]>;
}
