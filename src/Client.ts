import axios, { AxiosInstance } from 'axios';
import { URLSearchParams } from 'url';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

export type ClientOptions = {
	senderName?: string;
	baseUrl?: string;
};

export type MessageResponse = {
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

export type Account = {
	account_id: number;
	account_name: string;
	status: string;
	credit_balance: number;
};

export type SenderName = {
	name: string;
	status: string;
	created_at: string;
};

export type FetchMessagesOptions = {
	limit?: number;
	page?: number;
	startDate?: string;
	endDate?: string;
	status?: string;
	network?: string;
	sendername?: string;
};

export type User = {
	user_id: number;
	email: string;
	role: string;
	status?: string;
};

export class Client {
	protected axios: AxiosInstance;
	protected senderName = 'semaphore';
	protected key: string;

	constructor(key: string, options?: ClientOptions) {
		this.axios = axios.create({
			baseURL: options?.baseUrl || 'https://api.semaphore.com/api/v4',
		});

		if (options?.senderName) {
			this.senderName = options.senderName;
		}

		this.key = key;
	}

	async balance() {
		const { data } = await this.axios.get<Account>(`/account?apikey=${this.key}`);
		return data;
	}

	async send(recipients: string | string[], message: string) {
		const sendables = typeof recipients === 'string' ? [recipients] : recipients;

		if (sendables.length > 1000) {
			throw new Error('API is limited to sending to 1000 recipients at a time');
		}

		const { data } = await this.axios.post<MessageResponse[]>(`/messages?apikey=${this.key}`, {
			message,
			number: sendables.join(','),
			sendername: this.senderName,
		});

		return data;
	}

	async message(messageId: string) {
		const { data } = await this.axios.get<MessageResponse>(`/messages/${messageId}?apikey=${this.key}`);
		return data;
	}

	async messages(options?: FetchMessagesOptions) {
		const params = new URLSearchParams();

		if (options) {
			options.page = options.page || 1;
			options.limit = options.limit || 100;

			for (const [key, value] of Object.entries(options)) {
				params.set(key, typeof value === 'string' ? value : String(value));
			}
		}

		params.set('apikey', this.key);

		const { data } = await this.axios.get<MessageResponse[]>(`/messages?${params.toString()}`);

		return data;
	}

	async account() {
		const { data } = await this.axios.get<Account>(`/account?apikey=${this.key}`);
		return data;
	}

	async users() {
		const { data } = await this.axios.get<User[]>(`/users?apikey=${this.key}`);
		return data;
	}

	async senderNames() {
		const { data } = await this.axios.get<SenderName[]>(`/account/sendernames?apikey=${this.key}`);
		return data;
	}

	async transactions() {
		const { data } = await this.axios.get<Account[]>(`/account/transactions?apikey=${this.key}`);
		return data;
	}
}
