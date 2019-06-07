import React, { Component } from 'react';
import BookListItem from '../book-list-item';
import { connect } from 'react-redux';
import { withBookstoreService } from '../hoc';
import { booksLoaded } from "../../actions";

import './book-list.css';

class BookList extends Component {

    componentDidMount() {
        // 1. получить данные
        // 2. передать действия в store (dispatch action to store)

        // чтобы получить данные нужно вызвать метод из сервиса
        // а сервис мы можем получить из контекста
        // при помощи компонента высшего порядка
        // который мы сами написали - withBookstoreService

        // 1.
        const { bookstoreService } = this.props;
        const data = bookstoreService.getBooks();

        // 2. передать эти данные в store
        // для этого надо вызвать функцию dispatch
        // т.е. наш компонент должен получить доступ к этой функции.

        // объявим mapDispatchToProps и добавим 2-м аргументом в функцию connect


        this.props.booksLoaded(data);



    }

    render() {
        const { books } = this.props;
        return (
            <ul>
                {
                    books.map((book) => {
                        return (
                            <li key={book.id}><BookListItem book={ book }/></li>
                        )
                    })
                }
            </ul>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        books: state.books
    };
};

    //----------------------
    // mapDispatchToProps
    // 1-я форма этой функции - это обычная функция, которая принимает dispatch
    // и возвращает объект, где ключи - это свойства, properties, которые мы
    // будем присваивать нашему объекту
    // а значение - это функция, которую мы будем вызывать


    /*dispatch({
        type: 'BOOKS_LOADED',
        payload: newBooks
    })*/


    // можно улучшить код с помощью функции action creator
    // задача таких функций состоит в том, чтобы нам вручную не надо было создавать
    // объекты action-ы, объекты события.
    // сначала ее надо импортировать



    // еще 1 шаг оптимизации - bindActionCreators
    // эта функция возвращает объект идентичный такому,
    // который мы должны вернуть из mapDispatchToProps:

    /*return {
        booksLoaded: (newBooks) => {
            dispatch(booksLoaded(newBooks))
        }
    }*/


    // bindActionCreators обернет наши экшн криэйтеры
    // и сделает так, чтобы как только мы вызываем функцию booksLoaded,
    // она автоматически будет создавать нужное действие и передавать
    // его в метод dispatch, соотв. нам не нужно писать этот код вручную

    //
    // альтернативный формат mapDispatchToProps
    //
    // вместо передачи

    /*return bindActionCreators({
        booksLoaded
    }, dispatch)*/

    // в качестве второго аргумента в connect,
    // мы можем передать объект
    // если мы так поступим, то этот объект попадет в качестве первого аргумента
    // в bindActionCreators
    // и по умолчанию выполнится вот это действие:

    /*return bindActionCreators({
        booksLoaded
    }, dispatch)*/

    // поэтому mapDispatchToProps изменится с:

    // const mapDispatchToProps = (dispatch) => {
    //     return bindActionCreators({
    //         booksLoaded
    //     }, dispatch)
    // }
    // на:

const mapDispatchToProps =  {
    booksLoaded
};




// компонент будет получать книги из нашего redux store
// при помощи функции mapStateToProps и функции connect,
// которая подключает наш компонент к redux store



export default withBookstoreService()(connect(mapStateToProps, mapDispatchToProps)(BookList));

// для того, чтобы у нашего компонента появился доступ к сервису,
// нам нужно его обернуть в withBookstoreService

// получается, что наш компонент как бы оборачивается двумя
// компонентами высшего порядка


// после добавления второго аргумента к функции connect - mapDispatchToProps
// у нашего компонента появится новое свойство booksLoaded
// которое мы можем вызвать в методе жизненного цикла componentDidMount