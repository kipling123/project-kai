import React from "react";
import { Box, Typography, Card, CardContent, LinearProgress, Grid } from "@mui/material";
import { styled } from "@mui/material/styles";
import FactoryIcon from "@mui/icons-material/Factory";
import AdfScannerIcon from "@mui/icons-material/AdfScanner";
import CategoryIcon from "@mui/icons-material/Category";
import SettingsInputAntennaIcon from "@mui/icons-material/SettingsInputAntenna";
import TrainIcon from "@mui/icons-material/Train";

const ProductionCard = styled(Card)(({ theme }) => ({
  minWidth: 275,
  marginBottom: theme.spacing(2),
  borderRadius: 12,
  boxShadow: "0 4px 20px 0 rgba(0,0,0,0.12)",
  transition: "transform 0.3s, box-shadow 0.3s",
  "&:hover": {
    transform: "translateY(-5px)",
    boxShadow: "0 8px 24px 0 rgba(255,140,0,0.2)",
  },
}));

const ProgressBar = styled(LinearProgress)(({ theme, value }) => ({
  height: 12,
  borderRadius: 6,
  marginTop: theme.spacing(2),
  "& .MuiLinearProgress-bar": {
    borderRadius: 6,
    background: value > 75 
      ? "linear-gradient(to right, #4CAF50, #8BC34A)"
      : value > 50
      ? "linear-gradient(to right, #FFC107, #FF9800)"
      : "linear-gradient(to right, #FF5722, #F44336)",
  },
}));

const IconWrapper = styled("div")(({ theme, color }) => ({
  display: "inline-flex",
  padding: theme.spacing(1.5),
  borderRadius: "50%",
  background: color,
  color: "white",
  marginBottom: theme.spacing(1),
}));

export default function HomePage() {
  // Data produksi (bisa diganti dengan data dari API)
  const productionData = [
    {
      name: "Overhaul Point Machine",
      progress: 65,
      icon: <TrainIcon fontSize="large" />,
      color: "linear-gradient(135deg, #3a7bd5, #00d2ff)",
      details: "Pekerjaan perawatan sistem persinyalan kereta",
    },
    {
      name: "Produksi Radio Lokomotif",
      progress: 82,
      icon: <SettingsInputAntennaIcon fontSize="large" />,
      color: "linear-gradient(135deg, #8E2DE2, #4A00E0)",
      details: "Pembuatan dan pemasangan sistem komunikasi kereta",
    },
    {
      name: "Produksi Way Station",
      progress: 45,
      icon: <FactoryIcon fontSize="large" />,
      color: "linear-gradient(135deg, #f46b45, #eea849)",
      details: "Pembangunan stasiun kecil di jalur kereta",
    },
    {
      name: "Produksi Sentranik",
      progress: 73,
      icon: <AdfScannerIcon fontSize="large" />,
      color: "linear-gradient(135deg, #11998e, #38ef7d)",
      details: "Produksi komponen elektronik sistem kontrol",
    },
    {
      name: "Produksi Gentanik",
      progress: 91,
      icon: <CategoryIcon fontSize="large" />,
      color: "linear-gradient(135deg, #ff416c, #ff4b2b)",
      details: "Produksi komponen mekanik sistem gerbong",
    },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold", mb: 4, color: "#333" }}>
        Dashboard Produksi
        <Typography variant="subtitle1" sx={{ color: "#666", mt: 1 }}>
          Progress terkini dari seluruh lini produksi
        </Typography>
      </Typography>

      <Grid container spacing={3}>
        {productionData.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <ProductionCard>
              <CardContent>
                <IconWrapper color={item.color}>
                  {item.icon}
                </IconWrapper>
                <Typography variant="h6" component="div" sx={{ fontWeight: "bold" }}>
                  {item.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  {item.details}
                </Typography>
                
                <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
                  <Typography variant="body2" sx={{ mr: 1, fontWeight: "bold" }}>
                    Progress:
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: "bold", color: "#FF8C00" }}>
                    {item.progress}%
                  </Typography>
                </Box>
                
                <ProgressBar 
                  variant="determinate" 
                  value={item.progress} 
                  sx={{ 
                    background: "rgba(0, 0, 0, 0.1)",
                    "& .MuiLinearProgress-bar": {
                      background: item.progress > 75 
                        ? "linear-gradient(to right, #4CAF50, #8BC34A)"
                        : item.progress > 50
                        ? "linear-gradient(to right, #FFC107, #FF9800)"
                        : "linear-gradient(to right, #FF5722, #F44336)",
                    }
                  }}
                />
                
                <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
                  <Typography variant="caption">0%</Typography>
                  <Typography variant="caption">100%</Typography>
                </Box>
              </CardContent>
            </ProductionCard>
          </Grid>
        ))}
      </Grid>

      {/* Summary Card */}
      <ProductionCard sx={{ mt: 4 }}>
        <CardContent>
          <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
            Ringkasan Produksi
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Typography variant="body1" sx={{ mb: 1 }}>
                Total Progress:{" "}
                <span style={{ fontWeight: "bold", color: "#FF8C00" }}>
                  {Math.round(productionData.reduce((acc, curr) => acc + curr.progress, 0) / productionData.length)}%
                </span>
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Rata-rata progress seluruh lini produksi
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="body1" sx={{ mb: 1 }}>
                Produksi Tertinggi:{" "}
                <span style={{ fontWeight: "bold", color: "#4CAF50" }}>
                  {productionData.reduce((max, item) => max.progress > item.progress ? max : item).name}
                </span>
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {productionData.reduce((max, item) => max.progress > item.progress ? max : item).progress}% selesai
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </ProductionCard>
    </Box>
  );
}