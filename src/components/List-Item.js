import React from "react";
import styled from "styled-components";


const Button = styled.button`
  min-width: 2px;
  width: 80px;
  height: auto;
  letter-spacing: 0.5px;
  line-height: 15px;
  padding: 3px 3px 3px 3px;
  font-size: 12px;
  background-color: gray;
  color: white;
  text-transform: uppercase;
  font-family: "Open Sans Condensed";
  cursor: pointer;
`;

const StyledListItem = styled.div`
  padding: 10px;

  border-radius: 6px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  background: white;
  margin: 0 0 8px 0;
  display: grid;
  grid-gap: 20px;
  flex-direction: column;
`;


function ListItem ({item}) {
    function handleClick () {
      console.log("open new chat")
//      <button onClick={handleClick}>X</button>
    }
  return (  
    <StyledListItem>
    <span>{item}</span>
    <Button onClick={handleClick}>Start chat</Button>
    </StyledListItem>     
    )
}
export default ListItem;