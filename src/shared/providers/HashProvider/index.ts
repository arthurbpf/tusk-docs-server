import { hash, compare } from 'bcrypt';

export default class HashProvider {
	public async hash(payload: string): Promise<string> {
		return await hash(payload, 10);
	}

	public async compare(payload: string, hash: string): Promise<boolean> {
		return await compare(payload, hash);
	}
}
