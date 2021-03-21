import React from "react";
import Footer from "../Footer";
import Navbar from "../Navbar";

export default function Layout({ children }) {
	return (
		<div className="body">
			<Navbar />
			<main className="w-11/12 md:w-10/12">{children}</main>
			<Footer />
		</div>
	);
}
