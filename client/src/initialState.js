
// const user = JSON.parse(localStorage.getItem('profile'))

export const initialState = {
    firstName: '',
    lastName: '',
    email: '',
    anneargramType: '',
    invoiceNumber: Math.floor(Math.random() * 100000),
    quizState:[],
    creator: '',
    totalCount:0,
    limitCount:0,
}
