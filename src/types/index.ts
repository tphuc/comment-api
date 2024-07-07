export interface AuthenticatedRequest extends Request {
    user: {
      _id: string;
      username: string;
    };
}