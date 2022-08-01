// logic to fetch GIF on basis of keyword
import { useState, useEffect } from 'react';

const GIPHY_API_KEY = import.meta.env.VITE_GIPHY_API;

const gifFetch = ({ keyword }) => {
	const [gifURL, setGifURL] = useState("");

	const fetchGifs = async() => {
		try {
			const resposne = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${GIPHY_API_KEY}&q=${keyword.split(" ").join("")}&limit=1`);
			const { data } = await resposne.json();

			setGifURL(data[0]?.images?.downsized_medium?.url);
		} catch (error) {
			// if no gif found, use a demo one:
			setGifURL('https://media4.popsugar-assets.com/files/2013/11/07/832/n/1922398/eb7a69a76543358d_28.gif');
		}
	}

	useEffect(() => {
		if (keyword) fetchGifs();
	}, [keyword])

	return gifURL;
}

export default gifFetch;