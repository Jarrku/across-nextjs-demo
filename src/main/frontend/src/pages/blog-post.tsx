import Head from 'next/head'
import { StaticContent } from '../AcrossComponents'

export default function BlogPost() {
  return (
    <>
      <Head>
        <StaticContent element="title" {...{ 'th:text': '${post.title}' }}>
          Blog post
        </StaticContent>
      </Head>
      <StaticContent element="div">
        <header
          className="intro-header"
          {...{
            'th:style':
              "${'background-image: url(' + (#strings.isEmpty(post.imageUrl) ? #webapp.path('@static:/nextjs/img/about-bg.jpg') : post.imageUrl) + ')'}",
          }}
        >
          <div className="container">
            <div className="row">
              <div className="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1">
                <div className="post-heading">
                  <h1 {...{ 'th:text': '${post.title}' }}>
                    Man must explore, and this is exploration at its greatest
                  </h1>
                  <h2
                    className="subheading"
                    {...{
                      'th:if': '${post.subTitle}',
                      'th:text': '${post.subTitle}',
                    }}
                  >
                    Problems look mighty small from 150 miles up
                  </h2>
                  <span className="meta">
                    Posted by{' '}
                    <a href="#" {...{ 'th:text': '${post.author.name}' }}>
                      Across
                    </a>
                    <span
                      dangerouslySetInnerHTML={{
                        __html:
                          "on [[${#dates.format(post.publicationSettings.publicationDate,'MMMM d, yyyy')}]]",
                      }}
                    ></span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </header>

        <article>
          <div className="container">
            <div className="row">
              <div
                className="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1"
                {...{ 'th:utext': '${post.body}' }}
              >
                Blog post body.
              </div>
            </div>
          </div>
        </article>
      </StaticContent>
    </>
  )
}
