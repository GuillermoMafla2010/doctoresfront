import {Medicos} from './Medicos';

export class Citas{


    id:number;
    sintomas:string;
    fecha:string;
    hora_id:number;
    medico_id:number;
    especialidad_id:number;
    paciente_id:number;
    medicos:Medicos;

}
