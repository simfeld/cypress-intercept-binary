import { useState, useEffect } from 'react';

function HomePage() {
    const [data, setData] = useState(undefined);
    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(
                'http://localhost:4000/binary');
            const data = await res.arrayBuffer();
            const uint8 = new Uint8Array(data);
            setData({
                contentType: res.headers.get('content-type'),
                binaryData: uint8,
            });
        };
        fetchData().catch(e => {
            console.error(e);
        });
    }, []);
    if (!data) return <div>Fetching data...</div>
    return <div>
        <p>Data fetching successful</p>
        <p>content type: {data.contentType}</p>
        <p>array length: {data.binaryData.length}</p>
        <p>values:</p>
        <ul>
            {
                Array.from(data.binaryData).map((value, index) => <li key={index}>{value}</li>)
            }
        </ul>
    </div>
}

export default HomePage
