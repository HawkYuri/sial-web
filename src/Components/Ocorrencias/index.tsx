import React from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import SelectField from "../SelectField";

const corredores = [
  "Corredor 1 (bebidas)",
  "Corredor 2 (suco)",
  "Corredor 3",
  "Corredor 4",
  "Rack Aereo",
  "Rack Intermediario",
  "Rack Gaveta",
  "Area de Venda",
  "Caixaria (abastecimento rapido)",
];

const tiposAlerta = ["Ruptura", "Formulario"] as const;
const urgencias = ["Alta", "Media", "Baixa"] as const;

const schema = z.object({
  setor: z.string().nonempty("Selecione um setor"),
  tipo: z.enum(tiposAlerta),
  urgencia: z.enum(urgencias),
  comentario: z.string().optional(),
  nome: z.string().min(1, "Nome é obrigatório"),
  mercado: z.string().min(1, "Mercado é obrigatório"),
  foto: z
    .instanceof(File)
    .optional()
    .or(z.null())
    .refine((file) => !file || file.size <= 5 * 1024 * 1024, {
      message: "A imagem deve ter até 5MB",
    }),
});

export type IncidentFormSchema = z.infer<typeof schema>;

export default function IncidentForm(): React.ReactElement {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm<IncidentFormSchema>({
    resolver: zodResolver(schema),
    defaultValues: {
      setor: "",
      tipo: "Ruptura",
      urgencia: "Media",
      comentario: "",
      nome: "",
      mercado: "",
      foto: null,
    },
  });

  const onSubmit = async (data: IncidentFormSchema): Promise<void> => {
    alert("Ocorrência salva localmente!");
    console.log(data);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0] ?? null;
    setValue("foto", file);
  };

  const foto = watch("foto");

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        px: { xs: 1, sm: 2 },
        width: "100%",
      }}
    >
      <Typography
        variant="h6"
        textAlign="center"
        fontSize={{ xs: "1rem", sm: "1.25rem" }}
      >
        Gerar Ocorrência
      </Typography>

      <Controller
        name="setor"
        control={control}
        render={({ field }) => (
          <SelectField
            label="Setor (Corredor)"
            name={field.name}
            value={field.value}
            options={corredores}
            onChange={(e) => field.onChange(e.target.value)}
          />
        )}
      />
      {errors.setor && (
        <Typography color="error" variant="caption">
          {errors.setor.message}
        </Typography>
      )}

      <Controller
        name="tipo"
        control={control}
        render={({ field }) => (
          <SelectField
            label="Tipo de Alerta"
            name={field.name}
            value={field.value}
            options={[...tiposAlerta]}
            onChange={(e) => field.onChange(e.target.value)}
          />
        )}
      />

      <Controller
        name="urgencia"
        control={control}
        render={({ field }) => (
          <SelectField
            label="Urgência"
            name={field.name}
            value={field.value}
            options={[...urgencias]}
            onChange={(e) => field.onChange(e.target.value)}
          />
        )}
      />

      <TextField
        label="Comentário (opcional)"
        multiline
        rows={3}
        fullWidth
        {...register("comentario")}
      />

      <TextField
        label="Nome"
        fullWidth
        {...register("nome")}
        error={!!errors.nome}
        helperText={errors.nome?.message}
      />

      <TextField
        label="Mercado (unidade ou filial)"
        fullWidth
        {...register("mercado")}
        error={!!errors.mercado}
        helperText={errors.mercado?.message}
      />

      <Button variant="contained" component="label" fullWidth>
        Upload de Foto
        <input
          type="file"
          accept="image/*"
          hidden
          onChange={handleFileChange}
        />
      </Button>
      {foto && (
        <Typography variant="body2">
          Arquivo selecionado: {foto.name}
        </Typography>
      )}
      {errors.foto && (
        <Typography color="error" variant="caption">
          {errors.foto.message}
        </Typography>
      )}

      <Button type="submit" variant="contained" fullWidth>
        Enviar Ocorrência
      </Button>
    </Box>
  );
}
