import React from 'react';
import './shopping-cart-table.css';

const ShoppingCartTable = () => {
    return (
        <div className="shopping-cart-table" >
            <h2>Your order</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Item</th>
                        <th>Count</th>
                        <th>Price</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                <tr>
                    <td>1</td>
                    <td>Рискуя собственной шкурой</td>
                    <td>2</td>
                    <td>32</td>
                    <td className="action-area">
                        <button className="btn btn-outline-danger btn-small">
                            <i className="fa fa-trash-o"></i>
                        </button>
                        <button className="btn btn-outline-success btn-small">
                            <i className="fa fa-plus-circle"></i>
                        </button>
                        <button className="btn btn-outline-warning btn-small">
                            <i className="fa fa-minus-circle"></i>
                        </button>
                    </td>
                </tr>
                </tbody>
            </table>

            <div className="total">
                Total: 200$
            </div>
        </div>
    );
};

export default ShoppingCartTable;