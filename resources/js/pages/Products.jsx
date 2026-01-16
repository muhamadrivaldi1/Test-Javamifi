import React, { useEffect, useState } from 'react';
import api from '../services/api';
import '../styles/page.css';

export default function Products() {
    const [products, setProducts] = useState([]);
    const [name, setName] = useState('');
    const [stock, setStock] = useState('');
    const [price, setPrice] = useState('');

    const fetchProducts = async () => {
        const res = await api.get('/products');
        setProducts(res.data);
    };

    const submitProduct = async (e) => {
        e.preventDefault();
        await api.post('/products', { name, stock, price });
        setName('');
        setStock('');
        setPrice('');
        fetchProducts();
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <div className="page">
            <h2 className="page-title">Products</h2>

            {/* FORM */}
            <form className="form-card" onSubmit={submitProduct}>
                <input
                    placeholder="Product Name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    required
                />
                <input
                    type="number"
                    placeholder="Stock"
                    value={stock}
                    onChange={e => setStock(e.target.value)}
                    required
                />
                <input
                    type="number"
                    placeholder="Price"
                    value={price}
                    onChange={e => setPrice(e.target.value)}
                    required
                />
                <button>Add Product</button>
            </form>

            {/* TABLE */}
            <div className="table-card">
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Stock</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(p => (
                            <tr key={p.id}>
                                <td>{p.name}</td>
                                <td>{p.stock}</td>
                                <td>Rp {Number(p.price).toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
