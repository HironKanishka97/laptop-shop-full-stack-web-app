export interface ServerResponse<T>{
  code: number;
  message: string;
  data:T;

}

export interface TokenResponse{
  token: string;
}
