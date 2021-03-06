import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from "next/document";
import * as React from "react";

const inlineScript =
  "(function ( Across ) {Across['' + [[${javascript.key}]]] = [[${javascript.data}]];})( window.Across = window.Across || {} );";

class MyDocument extends Document<{ isLayout: boolean }> {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);

    const { pathname } = ctx;
    const isLayout = pathname.includes("across-layout");

    return {
      ...initialProps,
      isLayout,
    };
  }

  render() {
    return (
      <Html
        lang="en"
        data-th-fragment={this.props.isLayout ? undefined : "content"}
        {...{ "xmlns:th": "http://www.thymeleaf.org" }}
      >
        <Head>
          <meta charSet="utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="description" content="" />
          <meta name="author" content="" />
          <title data-th-include="${childPage} :: title" key="title">
            Page title
          </title>

          <script
            data-th-each='javascript :${webResourceRegistry.getResources("javascript")}'
            data-th-if='${javascript.location == "data"}'
            data-th-inline="javascript"
            type="text/javascript"
            dangerouslySetInnerHTML={{
              __html: inlineScript,
            }}
          ></script>

          <script
            data-th-each='javascript :${webResourceRegistry.getResources("javascript")}'
            data-th-src="@{${javascript.data}}"
            data-th-if='${javascript.location != "inline" and javascript.location != "data"}'
          ></script>
          <link
            rel="stylesheet"
            type="text/css"
            data-th-each='css : ${webResourceRegistry.getResources("css")}'
            data-th-href="@{${css.data}}"
          />
          <link
            href="https://fonts.googleapis.com/css?family=Lora:400,700,400italic,700italic"
            rel="stylesheet"
            type="text/css"
          />
          <link
            href="https://fonts.googleapis.com/css?family=Open+Sans:300italic,400italic,600italic,700italic,800italic,400,300,600,700,800"
            rel="stylesheet"
            type="text/css"
          />
        </Head>
        <body>
          <nav className="navbar navbar-default navbar-custom navbar-fixed-top">
            <div className="container-fluid">
              {/* Brand and toggle get grouped for better mobile display */}
              <div className="navbar-header page-scroll">
                <button
                  type="button"
                  className="navbar-toggle"
                  data-toggle="collapse"
                  data-target="#bs-example-navbar-collapse-1"
                >
                  <span className="sr-only">Toggle navigation</span>
                  Menu <i className="fa fa-bars" />
                </button>
                <a className="navbar-brand" data-th-href="@{/}">
                  Across Sample
                </a>
              </div>
              {/* Collect the nav links, forms, and other content for toggling */}
              <div
                className="collapse navbar-collapse"
                id="bs-example-navbar-collapse-1"
              >
                <ul className="nav navbar-nav navbar-right">
                  <li
                    data-th-each="item : ${topNav.items}"
                    data-th-classappend="${item.selected} ? 'active'"
                  >
                    <a
                      data-th-href="@{${item.url}}"
                      data-th-text="${item.title}"
                    >
                      menu item
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
          <Main />
          <footer>
            <div className="container">
              <div className="row">
                <div className="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1">
                  <ul className="list-inline text-center">
                    <li>
                      <a href="#">
                        <span className="fa-stack fa-lg">
                          <i className="fa fa-circle fa-stack-2x" />
                          <i className="fa fa-twitter fa-stack-1x fa-inverse" />
                        </span>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <span className="fa-stack fa-lg">
                          <i className="fa fa-circle fa-stack-2x" />
                          <i className="fa fa-facebook fa-stack-1x fa-inverse" />
                        </span>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <span className="fa-stack fa-lg">
                          <i className="fa fa-circle fa-stack-2x" />
                          <i className="fa fa-github fa-stack-1x fa-inverse" />
                        </span>
                      </a>
                    </li>
                  </ul>
                  <p className="copyright text-muted">
                    Copyright © Your Website 2017
                  </p>
                </div>
              </div>
            </div>
          </footer>
          <NextScript />
          {/* <ThBlock
            {...{
              'th:fragment': 'bottom-scripts(scripts)',
              'th:if': '${scripts}',
            }}
          >
            <ThBlock {...{ 'th:insert': '${scripts}' }} />
          </ThBlock>
          <ThBlock
            {...{
              'th:insert':
                '::bottom-scripts(~{${childPage} :: javascript-page-end})',
            }}
          /> */}
          {/* @ts-ignore */}
          <script
            data-th-each='javascript :${webResourceRegistry.getResources("javascript-page-end")}'
            data-th-src="@{${javascript.data}}"
            data-th-if='${javascript.location != "inline" and javascript.location != "data"}'
          ></script>
        </body>
      </Html>
    );
  }
}

export default MyDocument;
