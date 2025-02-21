import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/Navigation";

export const metadata: Metadata = {
	title: "Ribera - Pagrindinis puslapis",
	description: "Generated by create next app",
	authors: { name: "Justinas", url: "" },

};

export default function Komponentas({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className={`antialiased`}>

				<Navigation />
				{children}
			</body>
		</html>
	);
}
