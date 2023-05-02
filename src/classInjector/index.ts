import { getParametersFunctions } from "../lib/regex/logical/regex.logical";
import { Router } from "./logical/router-manger.logical";
import { MethodRequest } from "./models/router-manager.models";
export function RestInjector(path: string) {
  return function (target: Function) {
    target.prototype.BASE_URL = path;
  };
}
//declare get method decorator
export function Get(path: string) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    Router.Add(target, path, propertyKey, MethodRequest.GET);
    const parameters = getParametersFunctions(descriptor.value.toString());
    const originalMethod = descriptor.value;
    descriptor.value = async function (...args: any[]) {
      args.map((val, index) => {
        if (target["#" + propertyKey].parameters[index].replacecer) {
          parameters[index].replacecer = true;
        }
        parameters[index].value = val;
        parameters[index].type = typeof val;
        Router.parameterSetValues(target, propertyKey, parameters);
      });
      const response = await Router.getDataRoute(target, propertyKey).send();
      args.push(response);
      const addResponse = [...args];
      return originalMethod.apply(this, addResponse);
    };
  };
}

//declare param decorator
export function ParamUrl(targetPropertyKey: string) {
  return function (target: any, propertyKey: string, parameterIndex: number) {
    Router.addParameters(
      target,
      propertyKey,
      targetPropertyKey,
      parameterIndex
    );
  };
}
