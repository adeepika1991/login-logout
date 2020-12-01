import styled from 'styled-components';
import { PhonePage, Form } from './../phone/PhoneElements'

export const OtpPage = styled(PhonePage)`
    @media screen and (min-width: 250px) and (max-width: 400px){   
    height: 50vh;
    }
`

export const OtpForm = styled(Form)` 


 

`

export const Resend = styled.div` 
    width: 300px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 1rem;

    button {
        width: 50%;
  background-color: #4CAF50;
  color: white;
  padding: 10px 15px;
  margin: 8px 0;
  font-size:1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
    }

`