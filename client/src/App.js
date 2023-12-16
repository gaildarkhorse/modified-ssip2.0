
//Copyright (c) 2023 darkhorse

import React from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import SnackbarProvider from 'react-simple-snackbar'
import Home from './components/Home/Home';
import Invoice from './components/Invoice/Invoice';
import Invoices from './components/Invoices/Invoices';
import InvoiceDetails from './components/InvoiceDetails/InvoiceDetails'
import NavBar from './components/NavBar/NavBar';
//import Dashboard from './components/Dashboard/Dashboard';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
//import QuestionBoard from './components/QuestionBoard/QuestionBoard';

function App() {

  const user = JSON.parse(localStorage.getItem('profile'))
  // const data = require('./config/data.json');
  // localStorage.setItem('data', JSON.stringify({...data}))
  // const newData = JSON.parse(localStorage.getItem('data'));
  // console.log('NewData At First >>>>>>>>>>>>>>', newData)
  return (
    <div>
      <BrowserRouter>
      <SnackbarProvider>
      {/* <NavBar />  */}
      <Header />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/invoice" exact component={Invoice} />
          <Route path="/edit/invoice/:id" exact component={Invoice} />
          <Route path="/invoice/:id" exact component={InvoiceDetails} />
          <Route path="/invoices" exact component={Invoices} />
          {/* <Route path="/dashboard" exact component={Dashboard} /> */}
          <Redirect exact from="/new-invoice" to="/invoice" />
        </Switch>
        <Footer />
        </SnackbarProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
