export type TipoAlerta = "Ruptura" | "Formulario";
export type Urgencia = "Alta" | "Media" | "Baixa";

export interface IncidentFormData {
  setor: string;
  tipo: TipoAlerta;
  urgencia: Urgencia;
  comentario?: string;
  nome: string;
  mercado: string;
  foto: File | null;
}
