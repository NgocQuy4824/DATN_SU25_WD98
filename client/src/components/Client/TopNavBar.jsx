import { Col, Row } from 'antd';
import React from 'react';

const TopNavBar = () => {
    const marqueeStyle = {
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        boxSizing: 'border-box',
    };

    const textStyle = {
        display: 'inline-block',
        paddingLeft: '100%',
        animation: 'marquee 10s linear infinite',
        fontSize: '18px',
        fontWeight: 'bold',
        color: '#f7c600',   
    };

    return (
        <div style={{ background: '#2e3b3f', color: 'white',  overflow: 'hidden' }}>
            <Row>
                <Col span={24}>
                    <div style={marqueeStyle}>
                        <span style={textStyle}>Shop giày PaceRun - Chất lượng và phong cách mỗi bước chân!</span>
                    </div>
                </Col>
            </Row>
            <style>
                {`
                    @keyframes marquee {
                        0% { transform: translateX(0%); }
                        100% { transform: translateX(-100%); }
                    }
                `}
            </style>
        </div>
    );
};

export default TopNavBar;
