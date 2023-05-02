import { Regex } from "..";
import { Parameters } from "../models/functions.models";

export function getParametersFunctions(declare: string): Parameters[] {
  const paramters: Parameters[] = [];
  const functions = Regex.PARAMTERS_FUNCTIONS;
  const [instance] = declare.match(functions) ?? "";
  const format = instance?.slice(1).slice(0, -1);
  format.split(",").map((val, index) => {
    if (val.split("=").length == 2) {
      const [key, value] = val.split("=");
      paramters.push({
        key: key.trim(),
        index: index,
        defaultValue: eval(value.trim()),
        type: typeof eval(value.trim()),
        replacecer: false,
      });
    } else {
      paramters.push({
        key: val.trim(),
        index: index,
        type: undefined,
        defaultValue: null,
        value: null,
        replacecer: false,
      });
    }
  });
  return paramters;
}
