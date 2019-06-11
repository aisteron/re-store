import React, { Component } from 'react';
import BookListItem from '../book-list-item';
import { connect } from 'react-redux';
import { withBookstoreService } from '../hoc';
import { booksLoaded, booksRequested, booksError } from "../../actions";
import { compose } from '../../utils';
import './book-list.css';
import Spinner from "../spinner";
import ErrorIndicator from "../error-indicator";

class BookList extends Component {

    componentDidMount() {
        // 1. получить данные
        // 2. передать действия в store (dispatch action to store)

        // чтобы получить данные нужно вызвать метод из сервиса
        // а сервис мы можем получить из контекста
        // при помощи компонента высшего порядка
        // который мы сами написали - withBookstoreService


        // 2. передать эти данные в store
        // для этого надо вызвать функцию dispatch
        // т.е. наш компонент должен получить доступ к этой функции.

        // объявим mapDispatchToProps и добавим 2-м аргументом в функцию connect

        /*const {
            bookstoreService,
            booksLoaded,
            booksRequested,
            booksError
        } = this.props;
        booksRequested();
        bookstoreService.getBooks()
            .then((data) =>  booksLoaded(data))
            .catch((err) => booksError(err));*/


        // 131 урок. Задача вынести логику получения данных
        // и обработки ошибок из компонента

        // в идеале нужно, чтобы компонент принимал 1 свойство через props -
        // например, функцию fetchBooks

        // и, вызывая эту функцию, наш компонент вызывал бы логику получения данных
        // ну, а затем, едиственное за что бы отвечал наш компонент - это за рендеринг
        // такой код был был проще для тестирования и разработки

        this.props.fetchBooks()




    }

    render() {
        const { books, loading, error } = this.props;
        if(loading) return <Spinner />;
        if(error) return <ErrorIndicator />;

        return (
            <ul className="book-list">
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

const mapStateToProps = ({books, loading, error }) => {
    return { books, loading, error };
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

/*const mapDispatchToProps =  {
    booksLoaded,
    booksRequested,
    booksError
};*/

    // 131. урок
    // поскольку мы решили, что не хотим, чтобы компонент знал слишком много про процесс получения данных
    // мы  трансформируем mapDispatchToProps в ее 2-ю функциональную форму:

const mapDispatchToProps = (dispatch, ownProps) => {
    // принимает метод dispatch и возвращает объект, имеющий аналогичную структуру mapStateToProps
    // в качестве ключей мы передаем названия свойств, которые получит наш компонент
    // мы решили, что будем передавать функцию fetchBooks

    // в качестве значения может быть вообще какая-угодно функция
    // не смотря на то, что эта функция не использует dispatch и не вызывает ни одного action creator-a
    // это нормальная функция, которую можно передать в наш компомнент, используя механиз mapDispatchToProps

    // это значит, что в эту функцию мы могли бы перенести логику, которую писали ранее в самом компоненте

    // второй аргумент функции mapDispatchToProps - ownProps, св-ва, которые пришли компоненту connect()
    const { bookstoreService } = ownProps;
    return {
        fetchBooks: () => {
            dispatch(booksRequested());
            bookstoreService.getBooks()
                .then((data) =>  dispatch(booksLoaded(data)))
                .catch((err) => dispatch(booksError(err)));
        }
    }
};







// компонент будет получать книги из нашего redux store
// при помощи функции mapStateToProps и функции connect,
// которая подключает наш компонент к redux store



//export default withBookstoreService()(connect(mapStateToProps, mapDispatchToProps)(BookList));

// для того, чтобы у нашего компонента появился доступ к сервису,
// нам нужно его обернуть в withBookstoreService

// получается, что наш компонент как бы оборачивается двумя
// компонентами высшего порядка


// после добавления второго аргумента к функции connect - mapDispatchToProps
// у нашего компонента появится новое свойство booksLoaded
// которое мы можем вызвать в методе жизненного цикла componentDidMount

// === используем в итоге функцию-утилиту compose, для оборачивания компонента

export default compose(
    withBookstoreService(),
    connect(mapStateToProps, mapDispatchToProps)
)(BookList)