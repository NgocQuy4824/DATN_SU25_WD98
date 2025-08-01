import { Card as AntdCard } from 'antd';
import './styles.css';

const Card = ({ children, ...others }) => {
    return (
        <AntdCard className='card' {...others}>
            {children}
        </AntdCard>
    );
};

export default Card;
