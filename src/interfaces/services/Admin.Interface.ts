export interface LoggedUserData {
  id: number;
}

export interface CreateParams<T> {
  postData: T;
  loggedUserData?: LoggedUserData;
}

export interface GetParams {
  id: string;
}

export interface GetAllParams {
  page?: string;
  limit?: string;
}
