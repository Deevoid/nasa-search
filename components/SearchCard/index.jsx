import React from "react";
import readableDate from "../../utils/dateHandler";

export default function SearchCard(props) {
  const { img, keywords, title, date } = props;
	return (
		<div className="w-full lg:w-3/5 md:shadow-sm shadow-lg h-auto flex item-center overflow-hidden mb-8">
			<div
				className="h-auto w-36 md:w-32 flex-none bg-cover rounded rounded-r-none text-center overflow-hidden"
				style={{ backgroundImage: `url("${img}")`, }}
				title=""></div>
			<div className=" bg-white rounded rounded-l-none p-4 flex flex-col justify-between leading-normal">
				<div className="mb-3 font-bold text-xl">
					{title}
				</div>
				<div className="keywords flex flex-wrap mb-3">
          {
            keywords && keywords.slice(0,3).map((keyword, i) => (
              <span key={keyword + i} className="bg-red-500 rounded-full px-3 mr-2 mb-2 text-xs text-white py-1">{keyword}</span>
            ))
          }
				</div>
				<p className="desc text-left font-medium mb-0 ">🗓️&nbsp;{readableDate(date)}</p>
			</div>
		</div>
	);
}
