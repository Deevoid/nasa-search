import React, { useEffect, useRef, useState } from "react";
import SearchCard from "../SearchCard";
import Pagination from "react-js-pagination";
import Spinner from "../spinner";

export default function SearchPage(props) {
	const { data } = props;
	const [initialData, setInitialData] = useState([]);
	const [activePage, setActivePage] = useState(1);
	const [queryList, setQueryList] = useState([]);
	const ref = useRef();


	const handlePage = (page) => {
		setActivePage(page);
		const slicedList = initialData.slice(
			page > 1 ? page * 10 : page - 1,
			(page > 1 ? page * 10 : page - 1) + 10
		);
		setQueryList(slicedList);
		ref.current.scrollIntoView({ block: "start", behavior: "smooth" });
	};

	useEffect(() => {
		setQueryList(data.items.slice(0, 10));
		setInitialData(data.items);
		return () => {
			setQueryList([]);
      setInitialData([])
      setActivePage(1)
		};
	}, [data]);

	return (
    <>
    <div ref={ref}></div>
		{queryList.length > 0 ? <div className="mt-5">
			{queryList &&
				queryList.length > 0 &&
				queryList.map(
					(item) =>
						item.links &&
						item.data &&
						item?.links[0] &&
						item?.data[0] && (
							<SearchCard
								key={item.data[0].nasa_id}
								img={item.links[0].href}
								title={item.data[0].title}
								keywords={item.data[0].keywords}
								date={item.data[0].date_created}
							/>
						)
				)}

			{initialData.length > 10 && (
				<div className="flex items-center justify-center my-5 mx-auto  md:mr-10">
					<Pagination
						activePage={activePage}
						itemsCountPerPage={10}
						totalItemsCount={initialData.length - 10}
						pageRangeDisplayed={5}
						onChange={handlePage}
					/>
				</div>
			)}
		</div> : <div className="w-screen h-screen flex items-center justify-center">
      <Spinner />
    </div> }
    </>
	);
}
