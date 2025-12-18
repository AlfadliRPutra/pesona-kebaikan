import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";

const posts = [
	{
		id: "1",
		title: "Kenapa Donasi Kecil Tetap Berdampak Besar",
		excerpt:
			"Banyak orang mengira donasi kecil tidak berarti. Faktanya, konsistensi dan kebersamaan membuat dampak nyata.",
		cover: "/defaultimg.webp",
		date: "17 Des 2025",
		tag: "Inspiration",
	},
	{
		id: "2",
		title: "Transparansi Penggalangan Dana di Pesona Kebaikan",
		excerpt:
			"Kami memastikan setiap rupiah tercatat dan dilaporkan. Inilah cara kami menjaga kepercayaan.",
		cover: "/defaultimg.webp",
		date: "10 Des 2025",
		tag: "Update",
	},
	{
		id: "3",
		title: "Tips Menggalang Dana Efektif untuk Komunitas",
		excerpt:
			"Dari penulisan cerita hingga distribusi kampanye, berikut panduan singkat menggalang dana secara efektif.",
		cover: "/defaultimg.webp",
		date: "02 Des 2025",
		tag: "Guide",
	},
];

export default function BlogPage() {
	return (
		<Box sx={{ px: 2.5, pt: 2.5, pb: 1 }}>
			<Box
				sx={{
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between",
					mb: 2,
				}}
			>
				<Typography sx={{ fontSize: 18, fontWeight: 900, color: "#0f172a" }}>
					Blog
				</Typography>
			</Box>

			<Stack direction="row" spacing={1} sx={{ mt: 2, mb: 2 }}>
				<Chip label="Semua" color="primary" variant="filled" />
				<Chip label="Inspiration" variant="outlined" />
				<Chip label="Update" variant="outlined" />
				<Chip label="Guide" variant="outlined" />
			</Stack>

			<Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
				{posts.map((post) => (
					<Box key={post.id}>
						<Card
							variant="outlined"
							sx={{
								display: "flex",
								gap: 1.5,
								p: 1,
								borderRadius: 1,
								borderColor: "rgba(0,0,0,0.08)",
								bgcolor: "#fff",
							}}
						>
							<CardMedia
								component="img"
								image={post.cover}
								alt={post.title}
								sx={{
									width: 108,
									height: 108,
									borderRadius: 2,
									objectFit: "cover",
									flexShrink: 0,
									border: "1px solid rgba(0,0,0,0.06)",
								}}
							/>
							<CardContent
								sx={{
									p: 0,
									display: "flex",
									flexDirection: "column",
									gap: 0.75,
								}}
							>
								<Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
									<Chip
										size="small"
										label={post.tag}
										sx={{ borderRadius: 1 }}
									/>
									<Typography
										sx={{
											fontSize: 11,
											color: "rgba(15,23,42,.55)",
											fontWeight: 800,
										}}
									>
										{post.date}
									</Typography>
								</Box>
								<Typography
									sx={{ fontSize: 14.5, fontWeight: 900, color: "#0f172a" }}
								>
									{post.title}
								</Typography>
								<Typography
									sx={{ fontSize: 12.5, color: "rgba(15,23,42,.70)" }}
								>
									{post.excerpt}
								</Typography>
									<Box sx={{ display: "flex", gap: 1, mt: 0.5 }}>
										<Button
											component="a"
											href={`/blog/${post.id}`}
											size="small"
											variant="contained"
											sx={{
												textTransform: "none",
												fontWeight: 800,
												borderRadius: 2,
											}}
										>
											Baca
										</Button>
									<Button
										size="small"
										variant="text"
										sx={{
											textTransform: "none",
											fontWeight: 800,
											color: "rgba(15,23,42,.70)",
											"&:hover": { bgcolor: "rgba(15,23,42,.04)" },
										}}
									>
										Bagikan
									</Button>
								</Box>
							</CardContent>
						</Card>
					</Box>
				))}
			</Box>
		</Box>
	);
}
