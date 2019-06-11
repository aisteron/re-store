export default class BookstoreService {
    data = [
        {
            id: 1,
            title: 'Рискуя собственной шкурой',
            author: 'Нассим Николас Талеб',
            price: 32,
            coverImage: '/img/001.jpg'

        },
        {
            id: 2,
            title: 'Американские боги',
            author: 'Нил Гейман',
            price: 20,
            coverImage:'/img/002.jpg'
        }
    ];

    getBooks() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(this.data)
                //reject(new Error('Something going wrong...'))
            }, 700)
        })
    }
}