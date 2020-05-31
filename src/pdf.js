import React, { Component } from 'react';
import { StyleSheet } from '@react-pdf/renderer';
import Homepage from './homepage';
import { Document, Page, pdfjs } from 'react-pdf';
import {  Route, Link, BrowserRouter } from "react-router-dom";

class pdf extends Component {
  constructor(props) {
    super(props);
    this.state = { numPages: null, pageNumber: 1, history: null};
    pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
   // this.handleClick = this.handleClick.bind(this);
  }
   
  // handleClick() {
  //  // const history= useHistory();
  //   this.myHistory.push("/homepage");
  // }

  onDocumentLoadSuccess = ({ numPages }) => {
    this.setState({ numPages });
  };

  goToPrevPage = () => this.setState((state) => ({ pageNumber: state.pageNumber - 1 }));

  goToNextPage = () => this.setState((state) => ({ pageNumber: state.pageNumber + 1 }));
 
  loadBlockchain(){
    console.log(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + 
    encodeURIComponent("hash").replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"))
  }

  componentDidMount(){
    this.loadBlockchain();
    window.history.replaceState({}, document.title, "/" + "pdf");
  }

  render() {
    const { pageNumber, numPages } = this.state;
    const styles = StyleSheet.create({
      page: {       
        width:"100h"
      }
    });

    

    return (
      <div>
      
        <div style={{ width:'100%' ,alignItems: 'center',
        justifyContent: 'center', textAlign:'center'
    }}>
        <nav>
          {pageNumber===1 ?
          <button disabled={false}>Prev</button> :
          <button onClick={this.goToPrevPage}>Prev</button>  }
          {pageNumber===numPages ?
          <button disabled={false}>Next</button> :
          <button onClick={this.goToNextPage}>Next</button>}
          <button type="button" >
          <a target="_blank" href="http://localhost:3000/pdf?hash=QmaTyn7RxTjo2Z7Kf6CCnHE4MZKndfvZ8vu1qCG3t7roNK">Policies</a>
    </button>
       </nav>
       <p>
          Page
          {pageNumber}
          of
          {numPages}
        </p>
</div>
    
    <div style={{ display:'flex', width:'100h' ,alignItems: 'center',
        justifyContent: 'center', textAlign:'center'
    }}>
        
         <Document
            file="https://ipfs.io/ipfs/QmaTyn7RxTjo2Z7Kf6CCnHE4MZKndfvZ8vu1qCG3t7roNK"
            onLoadSuccess={this.onDocumentLoadSuccess}
          >
            <Page pageNumber={pageNumber} style={600}/>
          </Document>
          </div>
      
      </div>
    );
  }
}

export default pdf;
