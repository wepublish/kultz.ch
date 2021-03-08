import styled from 'styled-components'

export const RightArrow = styled.div`
  display: inline-block;
  font-size: 0;
  line-height: 0;
  top: 50%;
  width: 20px;
  height: 20px;
  cursor: ${({disabled}) => (disabled ? 'not-allowed' : 'pointer')};
  color: transparent;
  border: none;
  outline: 0;

  &::before {
    content: '>' !important;
    font-size: 45px;
    line-height: 1;
    color: black;
    width: 32px;
    height: 32px;
    border-radius: 4px;
  }
`

export const LeftArrow = styled.div`
  display: inline-block;
  font-size: 0;
  line-height: 0;
  top: 50%;
  width: 20px;
  height: 20px;
  cursor: ${({disabled}) => (disabled ? 'not-allowed' : 'pointer')};
  color: transparent;
  border: none;
  outline: 0;

  &::after {
    content: '<' !important;
    font-size: 45px;
    line-height: 1;
    color: black;
    width: 32px;
    height: 32px;
    border-radius: 4px;
  }
`
export const CardWrapper = styled.div`
  outline: none;
  width: ${({ width }) => `${width}%`};
  min-height: 1px;
  margin: 0;
  padding: 0;
  display: inline-block;
  vertical-align: top;
  white-space: normal;
`;

// Slide Wrapper
export const SliderWrapper = styled.div`
  position: relative;
  padding: ${props => props.padding || '0px 0px'};
  margin: ${props => props.margin || '0px 0px'};
`

// Slide Track
export const SliderTrack = styled.div`
  width: auto;
  position: relative;
  height: auto;
  width: 100%;
  display: inline-block;
  white-space: nowrap;
  overflow: hidden;
  vertical-align: top;
`

// Slider List
export const SliderList = styled.div`
  transform: translateX(${({translateX}) => (translateX ? `-${translateX}%` : '0%')});
  transition: transform 0.6s ease-in-out;
`

// Dots
export const DefaultDotsWrapper = styled.ul`
  display: inline-block;
  list-style: none;
  text-align: center;
  padding: 0px 3rem;
  margin: 0px;
`

export const DotButton = styled.button`
  pointer-events: all;
  border: 0;
  background: 0 0;
  cursor: pointer;
  font-size: 3.8em;
  line-height: 1.2em;
  margin: 0 5px;
  ${({active}) => (active ? 'color: #000000;' : 'color: #E5E5E5;')}
  &:hover {
    color: #000000;
  }
  &:focus {
    outline: none;
  }
`
