import React from 'react';
import { connect } from 'react-redux';
import './shopping-cart-table.css';

import {
    bookAddedToCart,
    bookRemovedFromCart,
    allBooksRemovedFromCart } from '../../actions';

const ShoppingCartTable =
    ({
       items,
       total,
       onIncrease,
       onDecrease,
       onDelete
   }) => {

    const renderRow = (item, idx) => {
      const {id, title, count, total} = item;
      return (
        <tr key={id}>
            <td>{idx+1}</td>
            <td>{title}</td>
            <td>{count}</td>
            <td>${total}</td>
            <td className="action-area" key={id}>
                <button
                    className="btn
                    btn-outline-danger
                    btn-small"
                    onClick={() => onDelete(id)}
                >
                    <i className="fa fa-trash-o"></i>
                </button>
                <button
                    className="btn
                    btn-outline-success
                    btn-small"
                    onClick={() => onIncrease(id)}
                >
                    <i className="fa fa-plus-circle"></i>
                </button>
                <button
                    className="btn
                    btn-outline-warning
                    btn-small"
                    onClick={() => onDecrease(id)}
                >
                    <i className="fa fa-minus-circle"></i>
                </button>
            </td>
        </tr>
    )
};

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
                { items.map(renderRow) }
                </tbody>
            </table>

            <div className="total">
                Total: {total}$
            </div>
        </div>
    );
};

const mapStateToProps = ({shoppingCart: { cartItems, orderTotal }}) =>{
    // принимает state
    // возвращает объект
    // ключи объекта - это свойства, которые мы присваиваем нашему компоненту
    // а значения - это значения из стейта, которые мы будем использовать
    return {
        items: cartItems,
        total: orderTotal
    }
};

const mapDispatchToProps = {

    onIncrease: bookAddedToCart,
    onDecrease: bookRemovedFromCart,
    onDelete: allBooksRemovedFromCart

};

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCartTable);