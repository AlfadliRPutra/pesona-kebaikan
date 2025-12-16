import HeroCarousel from "@/components/HeroCarousel";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function Home() {
  return (
    <Box sx={{ pb: 8 }}>
      <HeroCarousel />
      <Box sx={{ px: 2.5, mt: 6 }}>
        <Typography sx={{ fontSize: 16, fontWeight: 800, color: "#0f172a" }}>
          Mau berbuat baik apa hari ini?
        </Typography>
      </Box>
    </Box>
  );
}
