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

const mapDispatchToProps = (dispatch) => {
  // 1-я форма этой функции - это обычная функция, которая принимает dispatch
    // и возвращает объект, где ключи - это свойства, properties, которые мы
    // будем присваивать нашему объекту
    // а значение - это функция, которую мы будем вызывать

    return {
        booksLoaded: (newBooks) => {

            // можно улучшить код с помощью функции action creator
            // задача таких функций состоит в том, чтобы нам вручную не надо было создавать
            // объекты action-ы, объекты события
            // сначала ее надо импортировать

            /*dispatch({
                type: 'BOOKS_LOADED',
                payload: newBooks
            })*/

            dispatch(booksLoaded(newBooks))
        }



    }
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