export interface LoggedUserData {
  id: number;
}

export interface CreateParams<T> {
  postData: T;
  loggedUserData?: LoggedUserData;
}

export interface UpdateParams<T> {
  id: string;
  postData: T;
  loggedUserData?: LoggedUserData;
}

export interface DeleteParams {
  id: string;
  loggedUserData?: LoggedUserData;
}

export interface GetParams {
  id: string;
}

export interface GetAllParams {
  page?: string;
  limit?: string;
}
