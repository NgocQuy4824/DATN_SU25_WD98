import { Row } from 'antd';
import styled from 'styled-components';


export const WrapperHeader = styled(Row)`
    background-color: white;
    padding: 10px 20px;
    align-items: center;
    justify-content: space-between;
`
export const WrapperHeaderText = styled.div`
    color: black;
    font-size: 20px;
    font-weight: bold;
`;

export const WrapperHeaderLogo = styled.div`
    color: #f7c600;
    font-size: 40px;
    font-weight: bold;
    cursor: pointer;

    &:hover {
        text-decoration: underline;
    }
   
`;