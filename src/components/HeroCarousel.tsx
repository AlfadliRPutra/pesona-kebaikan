"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Image from "next/image";

const slides = [
	{
		src: "/brand/carousel1.webp",
	},
	{
		src: "/brand/carousel2.webp",
	},
];

export default function HeroCarousel() {
	const [index, setIndex] = React.useState(0);

	React.useEffect(() => {
		const id = setInterval(() => {
			setIndex((i) => (i + 1) % slides.length);
		}, 4000);
		return () => clearInterval(id);
	}, []);

	return (
		<Box
			sx={{
				position: "relative",
				height: 360,
				overflow: "hidden",
				borderBottomLeftRadius: 24,
				borderBottomRightRadius: 24,
				bgcolor: "#0f172a",
			}}
		>
			{slides.map((s, i) => (
				<Box
					key={i}
					sx={{
						position: "absolute",
						inset: 0,
						transition: "opacity 600ms ease",
						opacity: index === i ? 1 : 0,
					}}
				>
					<Image
						src={s.src}
						alt="Hero"
						fill
						sizes="(max-width: 480px) 100vw"
						priority={i === 0}
						style={{ objectFit: "cover" }}
					/>
					<Box
						sx={{
							position: "absolute",
							inset: 0,
							background:
								"linear-gradient(180deg,rgba(0, 0, 0, 1) 0%, rgba(3, 0, 0, 0.86) 50%, rgba(0, 0, 0, 0.3) 100%)",
						}}
					/>
				</Box>
			))}
		</Box>
	);
}
