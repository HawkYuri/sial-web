// src/components/IncidentTabs.tsx
import React, { useState } from "react";
import { Box, Tabs, Tab, useMediaQuery, useTheme } from "@mui/material";
import IncidentForm from "../Ocorrencias";
import IncidentList from "../Ocorrencias/IncidentList";
import IncidentPieChart from "../IncidentPieChart";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel({ children, value, index }: TabPanelProps) {
  return (
    <div role="tabpanel" hidden={value !== index} id={`tabpanel-${index}`}>
      {value === index && <Box sx={{ p: 2 }}>{children}</Box>}
    </div>
  );
}

export default function IncidentTabs(): React.ReactElement {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));

  const [tabValue, setTabValue] = useState(0);

  const handleChange = (
    _event: React.SyntheticEvent,
    newValue: number
  ): void => {
    setTabValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", maxWidth: 600, mx: "auto", mt: 3 }}>
      <Tabs
        value={tabValue}
        onChange={handleChange}
        variant={isSmall ? "scrollable" : "fullWidth"}
        scrollButtons="auto"
        aria-label="Incident tabs"
      >
        <Tab label="Formulário" />
        <Tab label="Lista" />
        <Tab label="Gráfico" />
      </Tabs>

      <TabPanel value={tabValue} index={0}>
        <IncidentForm />
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        <IncidentList />
      </TabPanel>

      <TabPanel value={tabValue} index={2}>
        <IncidentPieChart />
      </TabPanel>
    </Box>
  );
}
