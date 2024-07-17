import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import SimpleDetailsNewsCard from '../items/SimpleDetailsNewsCard';
import { base_url } from '../../../config/config';

const SearchNews = () => {
    const [news, setNews] = useState([]);
    const [searchParams] = useSearchParams();
    const value = searchParams.get('value');

    const getNews = async () => {
        try {
            const res = await axios.get(`${base_url}/api/search/news`, {
                params: { value }
            });
            setNews(res.data.news);
        } catch (error) {
            console.error('Error fetching news:', error);
        }
    };

    useEffect(() => {
        if (value) {
            getNews();
        }
    }, [value]);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {
                news.length > 0 ? news.map((item, i) => (
                    <SimpleDetailsNewsCard key={i} news={item} type="details-news" height={200} />
                )) : <p>No news found</p>
            }
        </div>
    );
};

export default SearchNews;
