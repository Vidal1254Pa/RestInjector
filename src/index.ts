import { Get, ParamUrl, RestInjector } from "./classInjector";

@RestInjector("https://script.google.com/macros/s/AKfycbxSmmOMrUEj8DEEnz4P2CQI33GNbrMRtJPUdK6D_FHdRx3lNkutzvgHUaSA8hCnIAtG")
class ClaseDePrueba {
  @Get("/exec")
  public prueba(@ParamUrl("id") id: string = "1",num:number,respuesta?:string) {
    console.log(respuesta);
  }
}

const instance = new ClaseDePrueba();
console.log(instance.prueba("2",2));
console.log(instance.prueba("2",30));
