import React, { useState, useEffect } from 'react'
import styles from './Invoice.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom'
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import { Grid } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import EditIcon from '@material-ui/icons/Edit';
import NewIcon from '@material-ui/icons/OpenInNew'
import Button from '@material-ui/core/Button';
import { initialState } from '../../initialState'
import axios from 'axios'
import { useLocation } from 'react-router-dom'
import { REACT_APP_API, REACT_APP_URL } from '../../config/constants'
import checkImg from '../../img/btn_check_on-b.png';
import Field from './Field';
import NavBar from '../NavBar/NavBar';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    large: {
        width: theme.spacing(12),
        height: theme.spacing(12),
    },
    table: {
        minWidth: 650,
    },

    headerContainer: {
        // display: 'flex'
        paddingTop: theme.spacing(1),
        paddingLeft: theme.spacing(5),
        paddingRight: theme.spacing(1),
    }
}));

const Invoice = () => {

    const location = useLocation()
    const [invoiceData, setInvoiceData] = useState(initialState)
    const today = new Date();
    const [selectedDate, setSelectedDate] = useState(today.getTime());
    const { id } = useParams()
    const { invoice } = useSelector((state) => state.invoices);
    const dispatch = useDispatch()
    const history = useHistory()
    const data = require('../../config/data.json');
    const [sendStatus, setSendStatus] = useState(null)
    const fs = require('fs');
    let initArray = Array.from({ length: 72 }, () => 0);
    const [limitCount, setLimitCount] = useState(0);
    const [totalCount, setTotalCount] = useState(0);
    const saved_data = JSON.parse(localStorage.getItem('saved_data'));
    const [quizState, updateQuizState] = useState(saved_data ? saved_data.quizState : initArray);
    const [formData, setFormData] = useState(initialState)

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }
    const optionClickOne = (question) => {
        let temp = totalCount;
        let temp_limit = limitCount;
        if (question.option[1].isChecked) {
            question.option[1].isChecked = (!question.option[1].isChecked);
            temp--;
        }
        if (question.option[2].isChecked) {
            question.option[2].isChecked = (!question.option[2].isChecked);
            temp--;
            temp_limit--;
        }
        if (question.option[3].isChecked) {
            question.option[3].isChecked = (!question.option[3].isChecked);
            temp--;
            temp_limit--;
        }

        question.option[0].isChecked = (!question.option[0].isChecked);
        if (question.option[0].isChecked) {
            temp++;
            let tmpQuizState = [...quizState];
            tmpQuizState[question.no] = 1;
            updateQuizState(tmpQuizState);
        } else {
            temp--;
            const tmpQuizState = [...quizState];
            tmpQuizState[question.no] = 0;
            updateQuizState(tmpQuizState);
        }
        setTotalCount(temp);
        setLimitCount(temp_limit);
    }

    const optionClickTwo = (question) => {
        let temp = totalCount;
        let temp_limit = limitCount;
        if (question.option[0].isChecked) {
            question.option[0].isChecked = (!question.option[0].isChecked);
            temp--;
        }
        if (question.option[2].isChecked) {
            question.option[2].isChecked = (!question.option[2].isChecked);
            temp--;
            temp_limit--;
        }
        if (question.option[3].isChecked) {
            question.option[3].isChecked = (!question.option[3].isChecked);
            temp--;
            temp_limit--;
        }

        question.option[1].isChecked = (!question.option[1].isChecked);
        if (question.option[1].isChecked) {
            temp++;
            let tmpQuizState = [...quizState];
            tmpQuizState[question.no] = 2;
            updateQuizState(tmpQuizState);
        } else {
            temp--;
            let tmpQuizState = [...quizState];
            tmpQuizState[question.no] = 0;
            updateQuizState(tmpQuizState);
        }
        setTotalCount(temp);
        setLimitCount(temp_limit);
    }

    const optionClickThree = (question) => {
        let temp = totalCount;
        let temp_limit = limitCount;
        if (limitCount >= 5) {
            return;
        }
        if (question.option[0].isChecked) {
            question.option[0].isChecked = (!question.option[0].isChecked);
            temp--;
        }
        if (question.option[1].isChecked) {
            question.option[1].isChecked = (!question.option[1].isChecked);
            temp--;
        }
        if (question.option[3].isChecked) {
            question.option[3].isChecked = (!question.option[3].isChecked);
            temp--;
            temp_limit--;
        }

        question.option[2].isChecked = (!question.option[2].isChecked);
        if (question.option[2].isChecked) {
            setTotalCount(totalCount + 1);
            let tmpQuizState = [...quizState];
            tmpQuizState[question.no] = 3;
            updateQuizState(tmpQuizState);
            temp++;
            temp_limit++;
        } else {
            setTotalCount(totalCount - 1);
            let tmpQuizState = [...quizState];
            tmpQuizState[question.no] = 0;
            updateQuizState(tmpQuizState);
            temp--;
            temp_limit--;
        }
        setTotalCount(temp);
        setLimitCount(temp_limit);
    }

    const optionClickFour = (question) => {
        let temp = totalCount;
        let temp_limit = limitCount;
        if (limitCount >= 5) {
            return;
        }
        if (question.option[0].isChecked) {
            question.option[0].isChecked = (!question.option[0].isChecked);
            temp--;
        }
        if (question.option[2].isChecked) {
            question.option[2].isChecked = (!question.option[2].isChecked);
            temp--;
            temp_limit--;
        }
        if (question.option[1].isChecked) {
            question.option[1].isChecked = (!question.option[1].isChecked);
            temp--;
        }

        question.option[3].isChecked = (!question.option[3].isChecked);
        if (question.option[3].isChecked) {
            temp++;
            temp_limit++;
            const tmpQuizState = [...quizState];
            tmpQuizState[question.no] = 4;
            updateQuizState(tmpQuizState);
        } else {
            temp--;
            temp_limit--;
            const tmpQuizState = [...quizState];
            tmpQuizState[question.no] = 0;
            updateQuizState(tmpQuizState);
        }
        setTotalCount(temp);
        setLimitCount(temp_limit);
    }

    const openNewTest = () => {

    }

    const openSavedTest = () => {

    }

    useEffect(() => {
        if (invoice) {
            //Automatically set the default invoice values as the ones in the invoice to be updated
            setInvoiceData(invoice)
            setSelectedDate(invoice.dueDate)
        }
    }, [invoice])

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    console.log(invoiceData)

    const saveState = () => {
        alert('hello-save')
        
    }
    //SEND PDF INVOICE VIA EMAIL
    const sendPdf = () => {
        alert('hello-send')
        return
        setSendStatus('loading')
        axios.post(`${REACT_APP_API}/send-pdf`,
            {
                date: invoice.createdAt,
                id: invoice.invoiceNumber,
                notes: invoice.notes,
                link: `${REACT_APP_URL}/invoice/${invoice._id}`,
                result: invoice.quizState,
            })
            .then(() => setSendStatus('success'))
            .catch((error) => {
                console.log(error)
                setSendStatus('error')
            })
    }
    const classes = useStyles()
    const [open, setOpen] = useState(false);


    return (
        <div className={styles.invoiceLayout}>
            <NavBar saveCallback ={saveState} sendCallback={sendPdf} />
            <form className="mu-form">

                <Divider />
                <div>
                    <p className=" mt-24 mb-8 text-center text-5xl font-extrabold">Self-Scoring of Instinctual Preferences <span class="font-light text-3xl">SSIP 2.0</span> </p>
                </div>
                <Divider />
                <Divider />
                <Divider />
                <Divider />
                <Divider />
                <Divider />
                <Divider />
                <div className='border border-black '>
                    <div className="grid grid-flow-row grid-cols-5 grid-rows-1">
                        <div className="mt-16 ml-24 mb-5 col-span-1 text-3xl">Name:</div>
                        <div className="mt-12  ml-2 mr-4 col-span-1"><Field name="firstName" label="First Name" handleChange={handleChange} autoFocus /></div>
                        <div className="mt-12 m1-2 mr-4 col-span-1"><Field name="lastName" label="Last Name" handleChange={handleChange} /></div>
                        <div className="mt-8 ml-40 col-span-2">
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardDatePicker
                                    margin="normal"
                                    id="date-picker-dialog"
                                    label="Date"
                                    format="MM/dd/yyyy"
                                    value={selectedDate}
                                    onChange={handleDateChange}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                />
                            </ MuiPickersUtilsProvider>
                        </div>
                    </div>
                    <div className="grid grid-flow-row grid-cols-8 grid-rows-1">
                        <div className="ml-24 mt-4 col-span-1 text-3xl">Email:</div>
                        <div className="ml-24 mb-5 mr-12 col-span-4"><Field name="email" label="Email" handleChange={handleChange} /></div>
                    </div>
                    <div className="grid grid-flow-row grid-cols-12 grid-rows-1">
                        <div className="ml-24 mt-4 col-span-1 text-3xl">Type:</div>
                        <div className="ml-36 mb-10 col-span-6"><Field name="enneagram-type" label="Enneagram Type" handleChange={handleChange} /></div>
                        <div className="mb-8 col-start-9">
                            <Button
                                variant="outlined"
                                style={{ justifyContentContent: 'center' }}
                                type="submit"
                                color="default"
                                onClick={openNewTest}
                                size="large"
                                className={classes.button}
                                startIcon={<NewIcon />}

                            >
                                New
                            </Button>
                        </div>
                        <div className="mb-8 col-start-11">
                            <Button
                                variant="outlined"
                                style={{ justifyContentContent: 'center' }}
                                type="submit"
                                color="default"
                                onClick={openSavedTest}
                                size="large"
                                className={classes.button}
                                startIcon={<EditIcon />}
                            >
                                Edit
                            </Button>
                        </div>

                    </div>


                </div>
                <Divider />
                <Divider />
                <Divider />
                <Divider />
                <Divider />
                <Divider />
                <Divider />
                <div>
                    <div className="font-extrabold fixed bottom-20 right-10 ">
                        <div className={`p-5  ${totalCount >= 72 ? "bg-green-500 " : "bg-blue-500 bg-opacity-50"} text-white rounded-full border-2`}>
                            Total Count: {totalCount}
                        </div>
                        <div className={` p-5 ${limitCount >= 1 ? (limitCount >= 5 ? "bg-red-500" : "bg-blue-500 bg-opacity-50") : "bg-green-500 bg-opacity-50"} text-white rounded-full border-2 `}>
                            Limit Count: {limitCount}
                        </div>
                    </div>
                    <p className="text-2xl m-10 font-bold">Choose the statement of each pair that best descripbes you.</p>
                    <Divider />
                    {data.map((question, index) => {
                        return (
                            <center key={index}>
                                <div className="grid grid-flow-row grid-cols-12 grid-rows-3">
                                    <div className="text-left pl-20 m-3 col-span-12 row-span-1 text-2xl font-bold">
                                        {question.no + 1}: {question.quiz}
                                    </div>
                                    {/* Option 1: */}
                                    <div className="text-left text-1xl pl-24 m-1 col-span-7  hover:bg-blue-200" onClick={() => optionClickOne(question)} key={question.option.id}>
                                        {question.option[0].text}
                                    </div>
                                    <div className="col-span-1 row-span-1">
                                        {
                                            (quizState[question.no] === 1) &&
                                            <img src={checkImg} width="18x" height="18px" alt="img2" />
                                        }
                                    </div>
                                    {/* <div className={` p-5 ${limitCount >= 1 ? (limitCount >= 5 ? "bg-red-500" : "bg-blue-500") : "bg-green-500"} text-white rounded-full border-2 `}></div>     */}
                                    {/* Option 3:*/}
                                    <div className={`mt-5 col-span-1 row-span-2 ${limitCount >= 5 ? "text-gray-300" : "text-black hover:bg-blue-200"} `} onClick={() => optionClickThree(question)} key={question.option.id}>
                                        {question.option[2].text}
                                    </div>
                                    <div className="mt-4 col-span-1 row-span-2 ">
                                        {
                                            (quizState[question.no] === 3) &&
                                            <img src={checkImg} width="18px" height="18px" alt="img2" />
                                        }
                                    </div>
                                    {/* <div className = {` p-5 ${ limitCount>= 1? (limitCount>= 5? "bg-red-500":"bg-blue-500") :"bg-green-500" } text-white rounded-full border-2 `}>*/}
                                    <div className={`mt-5  col-span-1 row-span-2 ${limitCount >= 5 ? "text-gray-300" : "text-black hover:bg-blue-200"} `} onClick={() => optionClickFour(question)} key={question.option.id}>
                                        {question.option[3].text}
                                    </div>
                                    <div className="mt-4 col-span-1 row-span-2 ">
                                        {
                                            (quizState[question.no] === 4) &&
                                            <img src={checkImg} width="18px" height="18px" alt="img2" />
                                        }
                                    </div>
                                    {/* Option 2: */}
                                    <div className="text-left text-1xl pl-24 m-1 col-span-7  hover:bg-blue-200" onClick={() => optionClickTwo(question)} key={question.option.id}>
                                        {question.option[1].text}

                                    </div>
                                    <div>
                                        {
                                            (quizState[question.no] === 2) &&
                                            <img src={checkImg} width="18px" height="18px" alt="img2" />
                                        }
                                    </div>

                                </div>
                            </center>
                        );
                    })}
                </div>
                

            </form >
        </div >
    )
}

export default Invoice
