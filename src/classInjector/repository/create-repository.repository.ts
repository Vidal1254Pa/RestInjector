import { MethodRequest, baseApp } from "../models/router-manager.models";

export async function CreateRepository(
  base_url: string,
  method: MethodRequest
): Promise<any> {
  const http = await fetch(base_url, {
    method: method,
  });
  return await http.json();
}
