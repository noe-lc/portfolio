import Document, {
  DocumentContext,
  Html,
  Head,
  Main,
  NextScript,
} from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);

    return initialProps;
  }

  render() {
    return (
      <Html>
        <Head>
          <meta property="og:title" content="NL" key="title" />
          <meta
            property="og:description"
            content="Web developer and geoinformatics engineer. Mexico. Bilingual (spanish and english)"
            key="title"
          />
          <meta
            name="keywords"
            content="web developer, react, reactjs, python, geoinformatics"
          />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
