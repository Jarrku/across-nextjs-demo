import Head from 'next/head'
import * as React from 'react'
import { StaticContent, ThBlock } from '../AcrossComponents'

export default function Homepage() {
  return (
    <>
      <Head>
        <title key="title">Homepage</title>
      </Head>
      <StaticContent
        element="header"
        className="intro-header"
        data-th-style="${'background-image: url(' + #webapp.path('@static:/nextjs/img/home-bg.jpg') + ')'}"
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1">
              <div className="site-heading">
                <h1>Hello Across!</h1>
                <hr className="small" />
                <span className="subheading" data-th-text="#{sample.message}">
                  A message from your message source
                </span>
              </div>
            </div>
          </div>
        </div>
      </StaticContent>

      <div className="container">
        <div className="row">
          <StaticContent
            element="div"
            className="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1"
          >
            <ThBlock data-th-each="post : ${blogsPage.content}">
              <div className="post-preview">
                <a data-th-href="@{${'/post/' + post.id}}">
                  <h2 className="post-title" data-th-text="${post.title}">
                    Man must explore, and this is exploration at its greatest
                  </h2>
                  <h3
                    className="post-subtitle"
                    data-th-if="${post.subTitle}"
                    data-th-text="${post.subTitle}"
                  >
                    Clicking this block will open a controller without the
                    template applied.
                  </h3>
                </a>
                <p className="post-meta">
                  Posted by{' '}
                  <a href="#" data-th-text="${post.author.name}">
                    Across
                  </a>
                  <span
                    dangerouslySetInnerHTML={{
                      __html:
                        "on [[${#dates.format(post.publicationSettings.publicationDate,'MMMM d, yyyy')}]]",
                    }}
                  />
                </p>
              </div>
              <hr />
            </ThBlock>
            <ul className="pager">
              <li className="previous" data-th-unless="${blogsPage.first}">
                <a data-th-href="@{/(page=${blogsPage.previousPageable().pageNumber})}">
                  &larr; Newer Posts
                </a>
              </li>
              <li className="next" data-th-unless="${blogsPage.last}">
                <a data-th-href="@{/(page=${blogsPage.nextPageable().pageNumber})}">
                  Older Posts &rarr;
                </a>
              </li>
            </ul>
          </StaticContent>
        </div>
      </div>
    </>
  )
}
