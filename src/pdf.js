import React, { Component } from 'react';
import { StyleSheet } from '@react-pdf/renderer';
import { Document, Page, pdfjs } from 'react-pdf';
import './css/appButton.css';

class pdf extends Component {
  constructor(props) {
    super(props);
    this.state = { numPages: null, pageNumber: 1, urlhash: null };
    pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
  }

  onDocumentLoadSuccess = ({ numPages }) => {
    this.setState({ numPages });
  };

  goToPrevPage = () => this.setState((state) => ({ pageNumber: state.pageNumber - 1 }));

  goToNextPage = () => this.setState((state) => ({ pageNumber: state.pageNumber + 1 }));

  loadBlockchain() {
    const urlhash = "https://ipfs.io/ipfs/" + (window.location.search.replace(new RegExp("^(?:.*[&\\?]" +
      encodeURIComponent("hash").replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"))
    console.log('ursl : ' + urlhash);
    this.setState({ urlhash })
  }

  componentDidMount() {
    this.loadBlockchain();
    window.history.replaceState({}, document.title, "/" + "pdf");
  }

  render() {
    const { pageNumber, numPages, urlhash } = this.state;
    const styles = StyleSheet.create({
      page: {
        width: "100h"
      }
    });



    return (
      <div>

        <div style={{
          width: '100%', 
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center'
        }}>

          <nav>
            {pageNumber === 1 ?
              <button className="button1 button2" disabled={false}>Prev</button> :
              <button onClick={this.goToPrevPage} className="button1 button2">Prev</button>}
            {pageNumber === numPages ?
              <button disabled={false} className="button1 button2">Next</button> :
              <button onClick={this.goToNextPage} className="button1 button2">Next</button>}
          </nav>

          <p> Page {pageNumber} of {numPages} </p>

        </div>

        <div style={{
          display: 'flex',
          width: '100h',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center'
        }}>

          <Document file={urlhash} onLoadSuccess={this.onDocumentLoadSuccess}>
            <Page pageNumber={pageNumber} style={600} />
          </Document>
          
        </div>
      </div>
    );
  }
}

export default pdf;