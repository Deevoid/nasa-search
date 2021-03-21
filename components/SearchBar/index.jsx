import React, { useState } from "react";

export default function SearchBar(props) {
	const [search, setSearch] = useState("");
	return (
			<div className="relative text-gray-600 focus-within:text-gray-400">
				<form
					onSubmit={(event) => {
						event.preventDefault();
						props.handleSearch(event.target.search.value);
					}}>
					<input
						value={search}
						onChange={(e) => {
							setSearch(e.target.value);
							props.handleSearch(e.target.value);
						}}
						type="search"
						name="search"
						className="py-2 text-sm text-white bg-gray-300 rounded-md pl-2 pr-14 focus:outline-none focus:ring focus:border-purple-600 focus:bg-white focus:text-gray-900"
						placeholder="Search..."
						autoComplete="off"
					/>
					<span className="absolute bg-purple-500 inset-y-0 right-0 rounded flex items-center px-2">
						<button type="submit" className="p-1 focus:outline-none focus:shadow-outline">
							<svg
								fill="none"
								stroke="#fff"
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								viewBox="0 0 24 24"
								className="w-6 h-6">
								<path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
							</svg>
						</button>
					</span>
				</form>
        {props.error && <p className="bg-transparent absolute">No result found</p>}
      </div>
	);
}
