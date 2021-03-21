import React from 'react'
import readableDate from '../../utils/dateHandler'

export default function HomePage({apod}) {
  return (
    <div>
      	<div className="img mt-5 md:mt-10 object-cover">
				<img
					src={apod.url}
					alt={apod.title}
					className="shadow h-96 md:h-auto rounded max-w-full align-middle border-none"
				/>
			</div>
			<p className="desc leading-relaxed text-left my-5">
				<span className="mr-2 text-purple-500 font-bold w-4 bg-purple-500">|</span>
				{apod.explanation}
			</p>
			<p className="desc text-left font-medium md:font-bold my-5">🗓️&nbsp;{readableDate(apod.date)}</p>
			<p className="desc text-left my-5 font-medium">
				<span className="text-gray-400 font-normal">Copyright</span>{" "}
				<span className="animate-pulse">©️</span>
				&nbsp;{apod.copyright || 'Data not available'}
			</p>
    </div>
  )
}
