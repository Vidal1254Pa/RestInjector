import { MethodRequest, PathRoute, baseApp } from "../models/router-manager.models";
import { CreateRepository } from "../repository/create-repository.repository";
const pathURLBase = "http://localhost:3000/";
export namespace Router {
  export function Add(
    instance: any,
    path: string,
    parent: string,
    method: MethodRequest
  ) {
    if (instance.hasOwnProperty("#" + parent)) {
      const getParams = instance["#" + parent];
      instance["#" + parent] = {
        path: path,
        method: method,
        ...getParams,
      };
    }
  }
  export function getDataRoute(instance: any, parent: string): PathRoute {
    instance["#" + parent].send = function () {
      const getMethod=instance["#" + parent].method;
      const path=instance[baseApp.BASE_URL_VAR]+instance["#" + parent].path;
      return CreateRepository.apply(this, [path,getMethod]);
    };
    return instance["#" + parent];
  }
  export function addParameters(
    instance: any,
    parent: string,
    key: string,
    index: number
  ) {
    if (!instance.hasOwnProperty("#" + parent)) {
      instance["#" + parent] = {
        parameters: [
          {
            key: key,
            index: index,
            value: null,
            defaultValue: null,
            replacecer: true,
          },
        ],
      };
    } else {
      const getParams = instance["#" + parent];
      instance["#" + parent] = {
        parameters: [
          ...getParams.parameters,
          {
            key: key,
            index: index,
            value: null,
            defaultValue: null,
            replacecer: false,
          },
        ],
      };
    }
  }
  export function parameterSetValue(
    instance: any,
    parent: string,
    index: number,
    value: any
  ) {
    if (instance.hasOwnProperty("#" + parent)) {
      const getParams = instance["#" + parent];
      const parameter = getParams.parameters.find(
        (val: any) => val.index === index
      );
      if (parameter) {
        parameter.value = value;
        parameter.defaultValue = null;
      }
    }
  }
  export function parameterSetValues(
    instance: any,
    parent: string,
    value: any[]
  ) {
    if (instance.hasOwnProperty("#" + parent)) {
      const getParams = instance["#" + parent];
      getParams.parameters = value;
    }
  }
}
