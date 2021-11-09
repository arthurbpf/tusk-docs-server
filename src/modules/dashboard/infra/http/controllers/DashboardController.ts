import getDashboardInfoService from '@modules/dashboard/services/GetDashboardInfoService';
import { Request, Response, NextFunction } from 'express';

export default class DashboardController {
	public async getDashboardInfo(
		request: Request,
		response: Response,
		next: NextFunction,
	): Promise<Response | undefined> {
		try {
			const service = new getDashboardInfoService();

			const info = await service.execute(request.user);

			return response.json(info);
		} catch (error) {
			next(error);
		}
	}
}
