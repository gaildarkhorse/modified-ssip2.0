import React, { useState, useEffect } from 'react'
import { useSnackbar } from 'react-simple-snackbar'
import { useLocation, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { initialState } from '../../initialState'
import { getInvoice } from '../../actions/invoiceActions'

import Spinner from '../Spinner/Spinner'
import ProgressButton from 'react-progress-button'
import axios from 'axios';
import { saveAs } from 'file-saver';
import styles from './InvoiceDetails.module.css'
import { useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import { REACT_APP_API, REACT_APP_URL } from '../../config/constants'
import checkImg from '../../img/btn_check_on-b.png';

const InvoiceDetails = () => {

  const location = useLocation()
  const [invoiceData, setInvoiceData] = useState(initialState)
  const [company, setCompany] = useState({})
  const { id } = useParams()
  const { invoice } = useSelector((state) => state.invoices)
  const dispatch = useDispatch()
  const history = useHistory()
  const [sendStatus, setSendStatus] = useState(null)
  const [downloadStatus, setDownloadStatus] = useState(null)
  // eslint-disable-next-line
  const [openSnackbar, closeSnackbar] = useSnackbar()
  const user = JSON.parse(localStorage.getItem('profile'))
  const data = require('../../config/data.json');

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
      backgroundColor: '#f2f2f2',
      borderRadius: '10px 10px 0px 0px'
    }
  }));


  const classes = useStyles()

  useEffect(() => {
    dispatch(getInvoice(id));
  }, [id, dispatch, location]);

  useEffect(() => {
    if (invoice) {
      setInvoiceData(invoice)
      setCompany(invoice?.businessDetails?.data?.data)
    }
  }, [invoice])


  const editInvoice = (id) => {
    history.push(`/edit/invoice/${id}`)
  }

  const createAndDownloadPdf = () => {
    setDownloadStatus('loading')
    axios.post(`${REACT_APP_API}/create-pdf`,
      {
        date: invoice.createdAt,
        id: invoice.invoiceNumber,
        notes: invoice.notes,
        company: company,
        result: invoice.quizState,
      })
      .then(() => axios.get(`${REACT_APP_API}/fetch-pdf`, { responseType: 'blob' }))
      .then((res) => {
        const pdfBlob = new Blob([res.data], { type: 'application/pdf' });

        saveAs(pdfBlob, 'invoice.pdf')
      }).then(() => setDownloadStatus('success'))
  }


  //SEND PDF INVOICE VIA EMAIL
  const sendPdf = (e) => {
    e.preventDefault()
    setSendStatus('loading')
    axios.post(`${REACT_APP_API}/send-pdf`,
      {
        date: invoice.createdAt,
        id: invoice.invoiceNumber,
        notes: invoice.notes,
        link: `${REACT_APP_URL}/invoice/${invoice._id}`,
        company: company,
        result: invoice.quizState,
      })
      // .then(() => console.log("invoice sent successfully"))
      .then(() => setSendStatus('success'))
      .catch((error) => {
        console.log(error)
        setSendStatus('error')
      })
  }


  const [open, setOpen] = useState(false)

  if (!invoice) {
    return (
      <Spinner />
    )
  }

  // return (
  //   <div className={styles.PageLayout}>
  //     {invoice?.creator?.includes(user?.result?._id || user?.result?.googleId) && (
  //       <div className={styles.buttons}>
  //         <ProgressButton
  //           onClick={sendPdf}
  //           state={sendStatus}
  //           onSuccess={() => openSnackbar("Your report sent successfully")}
  //         >
  //           Send Result
  //         </ProgressButton>

  //         <ProgressButton
  //           onClick={createAndDownloadPdf}
  //           state={downloadStatus}>
  //           Download
  //         </ProgressButton>

  //         <ProgressButton
  //           onClick={() => editInvoice(invoiceData._id)}
  //         >
  //           Edit
  //         </ProgressButton>
  //       </div>
  //     )}

      
        
  //   )
}

export default InvoiceDetails
