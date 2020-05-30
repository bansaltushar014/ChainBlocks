import React, { Component } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

class pdf extends Component {
  constructor(props) {
    super(props);
    this.state = { numPages: null, pageNumber: 1 };
    pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
  }

  onDocumentLoadSuccess = ({ numPages }) => {
    this.setState({ numPages });
  };

  goToPrevPage = () => this.setState((state) => ({ pageNumber: state.pageNumber - 1 }));

  goToNextPage = () => this.setState((state) => ({ pageNumber: state.pageNumber + 1 }));

  render() {
    const { pageNumber, numPages } = this.state;

    return (
      <div>
        <nav>
          <button onClick={this.goToPrevPage}>Prev</button>
          <button onClick={this.goToNextPage}>Next</button>
        </nav>

        <div style={{ width: 600 }}>
          <Document
            file="/testpdf.pdf"
            onLoadSuccess={this.onDocumentLoadSuccess}
          >
            <Page pageNumber={pageNumber} width={600} />
          </Document>
        </div>

        <p>
          Page
          {pageNumber}
          of
          {numPages}
        </p>
      </div>
    );
  }
}

export default pdf;
