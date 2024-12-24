import React from 'react';

export type DataItem = {
    id: number;
    name: string;
    description: string;
};

type Props = {
    propFromSsr: string
    items: DataItem[]
}

const DemoPage: React.FC<Props> = ({propFromSsr, items}) => {
    return (
        <div>
            <h1>Demo page</h1>
            <p>{`This prop is server rendered: ${propFromSsr}`}</p>
            <ul>
                {items.map((item) => (
                    <li key={item.id}>
                        <h2>{item.name}</h2>
                        <p>{item.description}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default DemoPage;