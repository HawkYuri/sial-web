import React, { useEffect, useState } from "react";
import { Box, Typography, Divider } from "@mui/material";
import { getAllIncidents } from "../../../indexedDB"; // Adjust the import path as necessary

interface Incident {
  setor: string;
  tipo: string;
  urgencia: string;
  comentario?: string;
  nome: string;
  mercado: string;
  foto?: File | null;
}

export default function IncidentList(): React.ReactElement {
  const [incidents, setIncidents] = useState<Incident[]>([]);

  useEffect(() => {
    getAllIncidents().then(setIncidents);
  }, []);

  if (incidents.length === 0) {
    return (
      <Typography variant="body1" mt={2}>
        Nenhuma ocorrência registrada ainda.
      </Typography>
    );
  }

  return (
    <Box display="flex" flexDirection="column" gap={2} mt={2}>
      {incidents.map((item, index) => (
        <Box key={index}>
          <Typography variant="subtitle1" fontWeight="bold">
            {item.nome} - {item.setor} - {item.tipo} ({item.urgencia})
          </Typography>
          <Typography variant="body2">
            {item.comentario || "Sem comentário"} | Mercado: {item.mercado}
          </Typography>
          <Divider sx={{ mt: 1 }} />
        </Box>
      ))}
    </Box>
  );
}
