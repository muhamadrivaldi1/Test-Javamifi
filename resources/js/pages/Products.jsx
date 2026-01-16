import React, { useEffect, useState } from 'react';
import api from '../services/api';
import '../styles/page.css';

export default function Products() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        api.get('/products').then(res => setProducts(res.data));
    }, []);

    return (
        <div>
            <h2 className="page-title">Products</h2>
            <ul>
                {products.map(p => (
                    <li key={p.id}>
                        {p.name} | Stock: {p.stock}
                    </li>
                ))}
            </ul>
        </div>
    );
}
