import styled, {css} from 'styled-components'

interface SpinnerProps {
  className?: string
  loading: boolean
}

const Spinner = ({loading = false, className}: SpinnerProps) =>
  loading ? <div className={className} /> : null

export default styled(Spinner)`
  background-repeat: no-repeat;
  ${props =>
    css`
      position: absolute;
      left: 50%;
      top: 50%;
      z-index: 1;
      width: 120px;
      height: 120px;
      margin: -76px 0 0 -76px;
      border: 16px solid #f3f3f3;
      border-radius: 50%;
      border-top: 16px solid #3498db;
      -webkit-animation: spin 2s linear infinite;
      animation: spin 2s linear infinite;

      @-webkit-keyframes spin {
        0% {
          -webkit-transform: rotate(0deg);
        }
        100% {
          -webkit-transform: rotate(360deg);
        }
      }

      @keyframes spin {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }
    `};
`
