import styled from 'styled-components';

const Image = styled.img.attrs(props => ({
  src: props.src || '.',
  width: props.width || '300',
  height: props.height || '300',
}))`
  /* Adapt the colors based on primary prop */

  margin: 2em;
  padding: 0.25em 1em;
  /*border: 2px solid;
  max-width: 100%;
  height: auto;*/ TODO: set breakpoint for responsive
`;

export { Image };