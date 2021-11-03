import axios from 'axios';
import FormData from 'form-data';
import AppError from '@shared/errors/AppError';
import { url } from 'inspector';

interface ImageInfo {
	url: string;
}

class ImageBbProvider {
	public async saveFile(fileBuffer: Buffer): Promise<string> {
		const formData = new FormData();

		formData.append('key', process.env.IMAGE_BB_KEY);
		formData.append('image', fileBuffer.toString('base64'));

		try {
			const info = await axios({
				url: 'https://api.imgbb.com/1/upload',
				method: 'post',
				data: formData,
				headers: formData.getHeaders(),
			});

			const { url } = info.data.data.image as ImageInfo;

			return url;
		} catch (error) {
			throw new AppError('imagebb API not responding');
		}
	}
}

export default ImageBbProvider;
