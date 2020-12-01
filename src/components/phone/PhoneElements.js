import styled from 'styled-components';

export const PhonePage = styled.div` 
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    width: 400px;
    height: 70vh;
    margin: 0 auto;
    margin-top: 50px;
     background-color: #f2f2f2;
    padding: 1rem;

     @media screen and (min-width: 250px) and (max-width: 400px){   
    width: 95vw;
    height: 70vh;
    //padding:0px;
} 
      
`

export const Title = styled.div` 
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-around;
   // border: 2px solid black;
   // margin-bottom: 2rem;
    height: 40%;
`

export const Form = styled.form` 
    width: 300px;
  //  border: inherit;

 @media screen and (min-width: 250px) and (max-width: 400px){   
    width: 90vw;
 }

    input[type=tel], input[type=text], input[type=email]{
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

button {
  width: 100%;
  background-color: #4CAF50;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  font-size:1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button :hover {
  background-color: #45a049;
}
p{
    color:#E44236
}

p::before {
  display: inline;
  content: "⚠ ";
}

`