export default function keywordExtractor(arr) {
	if (arr && arr.length > 0) {
		const allKeywords = [];
		arr.forEach((item) => {
			Object.keys(item).length > 0 &&
				Array.isArray(item.data) &&
				item.data[0] &&
				item.data[0].keywords &&
				item.data[0].keywords.length > 0 &&
				allKeywords.push(...item.data[0].keywords);
		});
		const map = allKeywords.reduce((acc, e) => acc.set(e, (acc.get(e) || 0) + 1), new Map());
		const sortedMap = new Map([...map.entries()].sort((a, b) => b[1] - a[1]));
		const relatedSearch = [...sortedMap.keys()].slice(0, 4);
		console.log(relatedSearch);
	}
}
