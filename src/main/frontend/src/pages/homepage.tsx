import Head from 'next/head'
import * as React from 'react'
import { StaticContent, ThBlock } from '../AcrossComponents'

export default function Homepage() {
  return (
    <>
      <Head>
        <title>Homepage</title>
      </Head>
      <StaticContent
        element="header"
        className="intro-header"
        {...{
          'th:style':
            "${'background-image: url(' + #webapp.path('@static:/nextjs/img/home-bg.jpg') + ')'}",
        }}
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1">
              <div className="site-heading">
                <h1>Hello Across!</h1>
                <hr className="small" />
                <span
                  className="subheading"
                  {...{ 'th:text': '#{sample.message}' }}
                >
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
            <ThBlock {...{ 'th:each': 'post : ${blogsPage.content}' }}>
              <div className="post-preview">
                <a {...{ 'th:href': "@{${'/post/' + post.id}}" }}>
                  <h2
                    className="post-title"
                    {...{ 'th:text': '${post.title}' }}
                  >
                    Man must explore, and this is exploration at its greatest
                  </h2>
                  <h3
                    className="post-subtitle"
                    {...{
                      'th:if': '${post.subTitle}',
                      'th:text': '${post.subTitle}',
                    }}
                  >
                    Clicking this block will open a controller without the
                    template applied.
                  </h3>
                </a>
                <p className="post-meta">
                  Posted by{' '}
                  <a href="#" {...{ 'th:text': '${post.author.name}' }}>
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
              <li
                className="previous"
                {...{ 'th:unless': '${blogsPage.first}' }}
              >
                <a
                  {...{
                    'th:href':
                      '@{/(page=${blogsPage.previousPageable().pageNumber})}',
                  }}
                >
                  &larr; Newer Posts
                </a>
              </li>
              <li className="next" {...{ 'th:unless': '${blogsPage.last}' }}>
                <a
                  {...{
                    'th:href':
                      '@{/(page=${blogsPage.nextPageable().pageNumber})}',
                  }}
                >
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
