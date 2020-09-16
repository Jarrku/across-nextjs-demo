import Head from 'next/head'
import * as React from 'react'
import { StaticContent } from '../AcrossComponents'

export default function About() {
  const [count, setCount] = React.useState(0)

  React.useEffect(() => {
    const intervalId = window.setInterval(() => setCount((c) => c + 1), 100)
    return () => window.clearInterval(intervalId)
  }, [])

  return (
    <>
      <Head>
        <title key="title">About page</title>
      </Head>
      <StaticContent
        element="header"
        className="intro-header"
        data-th-style="${'background-image: url(' + #webapp.path('@static:/nextjs/img/about-bg.jpg') + ')'}"
        onMount={(el) => {
          const h1 = el?.querySelector('h1')
          if (h1) {
            h1.innerText = 'But more about you...'
          }
        }}
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1">
              <div className="page-heading">
                <h1>About Me</h1>
                <hr className="small" />
                <span className="subheading">
                  I am a separate handler method in the ExamplePagesController.
                </span>
              </div>
            </div>
          </div>
        </div>
      </StaticContent>

      <div className="container">
        <div className="row">
          <div className="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1">
            <div>Dynamic react content: {count}</div>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Saepe
              nostrum ullam eveniet pariatur voluptates odit, fuga atque ea
              nobis sit soluta odio, adipisci quas excepturi maxime quae totam
              ducimus consectetur?
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eius
              praesentium recusandae illo eaque architecto error, repellendus
              iusto reprehenderit, doloribus, minus sunt. Numquam at quae
              voluptatum in officia voluptas voluptatibus, minus!
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nostrum
              molestiae debitis nobis, quod sapiente qui voluptatum, placeat
              magni repudiandae accusantium fugit quas labore non rerum
              possimus, corrupti enim modi! Et.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
