import { SearchOutlined } from "@ant-design/icons";
import React from "react";
import styled from "styled-components";

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 20px;
  padding: 2px 8px;
  width: fit-content;
  background-color: white;
`;

const SearchIcon = styled(SearchOutlined)`
  font-size: 14px;
  color: black;
  margin-right: 4px;
`;

const SearchInput = styled.input`
  border: none;
  outline: none;
  font-size: 14px;
  width: 150px;
  background-color: transparent;
`;

const ButtonInputSearch = () => {
  return (
    <SearchContainer>
      <SearchIcon />
      <SearchInput value="Search..." readOnly />
    </SearchContainer>
  );
};

export default ButtonInputSearch;
