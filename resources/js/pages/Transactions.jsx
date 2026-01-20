import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import api from '../services/api';
import '../styles/page.css';

export default function Transactions() {
    const [products, setProducts] = useState([]);
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        fetchProducts();
        fetchTransactions();
    }, []);

    const fetchProducts = async () => {
        try {
            const res = await api.get('/products');
            setProducts(res.data);
        } catch (err) {
            console.error(err);
            setProducts([]);
        }
    };

    const fetchTransactions = async () => {
        try {
            const res = await api.get('/transactions');
            setTransactions(res.data);
        } catch (err) {
            console.error(err);
            setTransactions([]);
        }
    };

    const createTransaction = async () => {
        const { value: formValues } = await Swal.fire({
            title: 'Create Transaction',
            html: `
                <select id="swal-product" class="swal2-input">
                    <option value="">Select Product</option>
                    ${products.map(p => `<option value="${p.id}">${p.name} (Stock: ${p.stock})</option>`).join('')}
                </select>
                <input id="swal-quantity" type="number" min="1" class="swal2-input" placeholder="Quantity">
            `,
            focusConfirm: false,
            showCancelButton: true,
            confirmButtonText: 'Create',
            preConfirm: () => {
                const productId = document.getElementById('swal-product').value;
                const quantity = document.getElementById('swal-quantity').value;

                if (!productId || !quantity || Number(quantity) < 1) {
                    Swal.showValidationMessage('Please select a product and enter a valid quantity');
                    return null;
                }

                return { product_id: Number(productId), quantity: Number(quantity) };
            }
        });

        if (formValues) {
            try {
                await api.post('/transactions', formValues);
                Swal.fire({
                    icon: 'success',
                    title: 'Transaction Created',
                    text: 'Transaction has been successfully created!',
                    timer: 2000,
                    showConfirmButton: false,
                });
                fetchTransactions();
                fetchProducts();
            } catch (err) {
                console.error(err);
                Swal.fire('Error', 'Failed to create transaction', 'error');
            }
        }
    };

    return (
        <div className="page">
            <h2 className="page-title">Transactions</h2>

            <button className="btn-primary" onClick={createTransaction}>
                Create Transaction
            </button>

            <div className="table-card" style={{ marginTop: '20px' }}>
                <table>
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Product</th>
                            <th>Qty</th>
                            <th>Price</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.length > 0 ? (
                            transactions.map((t, index) => {
                                const price = t.product?.price ?? 0;
                                const total = t.total ?? price * t.quantity;

                                return (
                                    <tr key={t.id}>
                                        <td>{index + 1}</td>
                                        <td>{t.product?.name ?? '-'}</td>
                                        <td>{t.quantity}</td>
                                        <td>Rp {Number(price).toLocaleString()}</td>
                                        <td>Rp {Number(total).toLocaleString()}</td>
                                    </tr>
                                );
                            })
                        ) : (
                            <tr>
                                <td colSpan="5" style={{ textAlign: 'center' }}>
                                    No transactions
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
