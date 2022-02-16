import styled from 'styled-components';

type Wrapper = {
  color?: string;
  name?: string;
};

export const Wrapper = styled.div<Wrapper>`
  /* Adapt the colors based on primary prop */
  background: ${props => props.color};
`;
