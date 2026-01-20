import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import api from '../services/api';
import '../styles/page.css';

export default function Products() {
    const [products, setProducts] = useState([]);

    const fetchProducts = async () => {
        try {
            const res = await api.get('/products');
            setProducts(res.data);
        } catch (err) {
            console.error(err);
            setProducts([]);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const addProduct = async () => {
        const { value: formValues } = await Swal.fire({
            title: 'Add New Product',
            html:
                '<input id="swal-name" class="swal2-input" placeholder="Product name">' +
                '<input id="swal-stock" class="swal2-input" type="number" placeholder="Stock">' +
                '<input id="swal-price" class="swal2-input" type="number" placeholder="Price">',
            focusConfirm: false,
            showCancelButton: true,
            confirmButtonText: 'Add',
            preConfirm: () => {
                const name = document.getElementById('swal-name').value;
                const stock = document.getElementById('swal-stock').value;
                const price = document.getElementById('swal-price').value;

                if (!name || !stock || !price) {
                    Swal.showValidationMessage('Please enter all fields');
                    return null;
                }

                if (Number(stock) < 0 || Number(price) < 0) {
                    Swal.showValidationMessage('Stock and price must be positive numbers');
                    return null;
                }

                return {
                    name,
                    stock: Number(stock),
                    price: Number(price),
                };
            },
        });

        if (formValues) {
            try {
                await api.post('/products', formValues);
                Swal.fire({
                    icon: 'success',
                    title: 'Product added',
                    text: `"${formValues.name}" has been added successfully!`,
                    timer: 2000,
                    showConfirmButton: false,
                });
                fetchProducts();
            } catch (err) {
                console.error(err);
                Swal.fire({
                    icon: 'error',
                    title: 'Failed',
                    text: 'Failed to add product',
                });
            }
        }
    };

    return (
        <div className="page">
            <h2 className="page-title">Products</h2>

            <button className="btn-primary" onClick={addProduct}>
                Add Product
            </button>

            <div className="table-card" style={{ marginTop: '20px' }}>
                <table>
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Stock</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.length > 0 ? (
                            products.map((p) => (
                                <tr key={p.id}>
                                    <td>{p.name}</td>
                                    <td>{p.stock}</td>
                                    <td>Rp {Number(p.price).toLocaleString()}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="3" style={{ textAlign: 'center' }}>
                                    No products found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
