export type Modalidad = "Presencial" | "Híbrida" | "Remota";

export type EstadoEmpresa =
  | "Disponible"
  | "Sin vacantes"
  | "Inactiva";

export interface Empresa {
  _id?: string;
  nombre: string;
  sector: string;
  ciudad: string;
  contacto: string;
  correo: string;
  telefono: string;
  vacantes: number;
  modalidad: Modalidad;
  estado: EstadoEmpresa;
}

export type NuevaEmpresa = Omit<Empresa, "_id">;

export type ActualizacionEmpresa = Pick<
  Empresa,
  "vacantes" | "estado"
>;
