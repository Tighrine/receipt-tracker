'use client';

import { useParams } from 'next/navigation';

function Receipt() {
    const { id } = useParams<{ id: string }>();

    return <div>This is the receipt id: {id}</div>;
}

export default Receipt;
