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
