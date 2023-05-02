export interface Parameters {
  key: string;
  index: number;
  value?: any;
  defaultValue?: any;
  type: any;
  replacecer?: boolean;
}
export enum MethodRequest {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}
export enum baseApp {
  BASE_URL_VAR = "BASE_URL",
}
export interface PathRoute {
  path: "string";
  method: MethodRequest;
  parameters: Parameters[];
  send(): Promise<any>;
}
