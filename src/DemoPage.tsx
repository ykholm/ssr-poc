import React, { useEffect, useState } from 'react';

type DataItem = {
    id: number;
    name: string;
    description: string;
};

const fetchDataFromServer = (): Promise<DataItem[]> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                { id: 1, name: 'Item 1', description: 'Description of Item 1' },
                { id: 2, name: 'Item 2', description: 'Description of Item 2' },
                { id: 3, name: 'Item 3', description: 'Description of Item 3' },
            ]);
        }, 1000); // Simulate a 1-second server delay
    });
};

const DemoPage: React.FC = () => {
    const [data, setData] = useState<DataItem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const result = await fetchDataFromServer();
            setData(result);
            setLoading(false);
        };

        fetchData();
    }, []);

    return (
        <div>
            <h1>Demo Page</h1>
            {loading ? (
                <p>Loading data...</p>
            ) : (
                <ul>
                    {data.map((item) => (
                        <li key={item.id}>
                            <h2>{item.name}</h2>
                            <p>{item.description}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default DemoPage;