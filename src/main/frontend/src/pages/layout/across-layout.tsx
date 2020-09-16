import { StaticContent, ThBlock } from '../../AcrossComponents'

export default () => (
  <StaticContent element="div">
    <ThBlock data-th-include="${childPage} :: content" />
  </StaticContent>
)
