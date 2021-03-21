import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import getApod from "../api/apod";
import searchData from "../api/search";
import HomePage from "../components/HomePage/HomePage";
import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import SearchPage from "../components/SearchPage";
import debounce from "../utils/debounce.js";
import keywordExtractor from "../utils/keywordExtractor";

const key = process.env.NEXT_PUBLIC_API_KEY;

export default function Home(props) {
	const [searchList, setSearchList] = useState({});
	const [keywords, setKeywords] = useState([]);
	const [query, setQuery] = useState("");
	const [error, setError] = useState(false);
	const ref = useRef();

	const { apod } = props;
	async function debouncehandleSearch(value) {
		if (value) {
			setQuery(value);
			value = value.replace(/\s/g, "");
			const search = await searchData(value);
			if (
				search &&
				search.collection &&
				Object.keys(search.collection).length > 0 &&
				search.collection.items.length > 0
			) {
				setError(false);
				setSearchList(search.collection);
			} else setError(true);
		} else {
			setError(false);
			setSearchList({});
		}
	}

	useEffect(() => {
		const res = keywordExtractor(searchList.items);
		setKeywords(res);
	}, [searchList]);

	const handleSearch = debounce(debouncehandleSearch, 250);

	return (
		<>
			<Head>
				<title>Nasa media search</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<div
				ref={ref}
				className="head  mt-4 flex flex-col md:flex-row flex-wrap items-center justify-center md:justify-between">
				<p className="text-2xl mb-4 md:mb-0 font-medium ">
					{Object.keys(searchList).length <= 0 ? (
						apod.title
					) : (
						<span>
							Search results for <span className="text-purple-600 underline">{query}</span>
						</span>
					)}
				</p>
				<SearchBar query={query} error={error} handleSearch={handleSearch} />
			</div>
			{searchList && Object.keys(searchList).length > 0 ? (
				searchList && (
					<>
						<SearchPage data={searchList} />
						<div className="keywords my-5">
							<p className="text-lg font-medium ">Related searches...</p>
							{keywords &&
								keywords.length > 0 &&
								keywords.map((item) => (
									<span
										onClick={() => {
											handleSearch(item);
											ref.current.scrollIntoView({ behavior: "smooth" });
										}}
										className="cursor-pointer text-sm underline mr-2"
										key={item}>
										{item}
									</span>
								))}
						</div>
					</>
				)
			) : (
				<HomePage apod={apod} />
			)}
		</>
	);
}

export async function getServerSideProps(context) {
	const apod = await getApod();
	return {
		props: { apod }, // will be passed to the page component as props
	};
}
