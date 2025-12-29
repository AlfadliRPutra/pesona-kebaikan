"use client";

import Link from "next/link";
import { Button, Typography, Box, Container } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function NotFound() {
	return (
		<Container
			maxWidth="sm"
			sx={{
				height: "100%",
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "center",
				textAlign: "center",
				p: 4,
				minHeight: "70vh",
			}}
		>
			<Box
				sx={{
					mb: 4,
					position: "relative",
					display: "inline-flex",
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				<Box
					sx={{
						position: "absolute",
						width: "140%",
						height: "140%",
						borderRadius: "50%",
						background: (theme) =>
							`radial-gradient(circle, ${theme.palette.primary.light} 0%, ${theme.palette.background.default} 70%)`,
						opacity: 0.2,
						filter: "blur(30px)",
						zIndex: 0,
					}}
				/>
				<Typography
					variant="h1"
					component="h1"
					sx={{
						fontSize: "8rem",
						fontWeight: 800,
						color: "text.primary",
						opacity: 0.05,
						lineHeight: 1,
						position: "absolute",
						top: "50%",
						left: "50%",
						transform: "translate(-50%, -50%)",
						userSelect: "none",
						zIndex: 0,
					}}
				>
					404
				</Typography>
				<Box
					sx={{
						position: "relative",
						zIndex: 1,
						color: "primary.main",
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
					}}
				>
					<Typography
						variant="h1"
						sx={{
							fontWeight: 800,
							fontSize: "5rem",
							background: (theme) =>
								`linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
							WebkitBackgroundClip: "text",
							WebkitTextFillColor: "transparent",
							lineHeight: 1,
							mb: 1,
						}}
					>
						404
					</Typography>
				</Box>
			</Box>

			<Typography
				variant="h5"
				component="h2"
				sx={{
					fontWeight: 700,
					color: "text.primary",
					mb: 2,
					position: "relative",
					zIndex: 1,
				}}
			>
				Halaman Tidak Ditemukan
			</Typography>

			<Typography
				variant="body1"
				color="text.secondary"
				sx={{
					mb: 5,
					maxWidth: "320px",
					mx: "auto",
					lineHeight: 1.6,
				}}
			>
				Maaf, halaman yang Anda cari tidak dapat ditemukan. Mungkin telah
				dipindahkan atau dihapus.
			</Typography>

			<Link href="/" style={{ textDecoration: "none" }}>
				<Button
					component="span"
					variant="contained"
					size="large"
					startIcon={<ArrowBackIcon />}
					sx={{
						borderRadius: "50px",
						textTransform: "none",
						px: 5,
						py: 1.5,
						fontWeight: 700,
						fontSize: "1rem",
						boxShadow: (theme) =>
							`0 10px 20px -5px ${theme.palette.primary.light}`,
						"&:hover": {
							boxShadow: (theme) =>
								`0 15px 25px -5px ${theme.palette.primary.main}`,
							transform: "translateY(-2px)",
						},
						transition: "all 0.3s ease",
					}}
				>
					Kembali ke Beranda
				</Button>
			</Link>
		</Container>
	);
}
