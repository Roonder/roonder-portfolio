import type { Metadata } from "next";
import { Jost } from "next/font/google";
import "./globals.css";
import { Provider } from "@/components/ui/provider";
import { Aurora } from "@/components/background/Aurora";

const jost = Jost({
	style: "normal",
	weight: "400",
	subsets: ["latin"],
	variable: "--font-jost"
});

export const metadata: Metadata = {
	title: "Roonder | Juliam Aponte ",
	description: "Welcome to my portfolio, my name is Juliam and I'm ready to code with you!",
	authors: [
		{ name: "roonder", url: "https://github.com/roonder"}, 
		{ name: "Mauricio Torrens", url: ""}
	]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
	<html lang="en" suppressHydrationWarning>
		<head>
			<link rel="icon" href="/roonder-favico.png" sizes="any" />
			<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		</head>
		<body
		className={`${jost.variable} antialiased bg-roonder-white text-roonder-gunmetal relative`}
		>
			<Provider>
				{children}
				<Aurora />
			</Provider>
		</body>
	</html>
  );
}
