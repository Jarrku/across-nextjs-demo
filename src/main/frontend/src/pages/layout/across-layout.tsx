import { StaticContent, ThBlock } from '../../AcrossComponents'

export default () => (
  <StaticContent element="div">
    <ThBlock
      {...{
        'th:include': '${childPage} :: content',
      }}
    />
  </StaticContent>
)
