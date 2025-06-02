import React from 'react'
import { Col } from 'antd';
import TopNavBar from '../Client/TopNavBar';
import { IdcardOutlined, ShoppingCartOutlined, UserOutlined } from '@ant-design/icons'
import { WrapperHeader, WrapperHeaderLogo } from './style';
import ButtonInputSearch from '../Client/ButtonInputSearch/ButtonInputSearch';


const HeaderComponent = ({ isAdmin = false }) => {
  return (
    <div>
      {!isAdmin && <TopNavBar />}
      <WrapperHeader>
        <WrapperHeaderLogo flex={1} style={{ paddingRight: '10px' }}>
          PaceRun
        </WrapperHeaderLogo>

        {!isAdmin && (
          <div style={{ flex: 'none' }}>
            <ButtonInputSearch />
          </div>
        )}

        <Col flex={2}>
          <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'flex-end', gap: 8 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, whiteSpace: 'nowrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <IdcardOutlined />
                <span>Tài Khoản</span>
              </div>

              {!isAdmin && (
                <>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <UserOutlined />
                    <span>Đăng ký/Đăng nhập</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <ShoppingCartOutlined />
                    <span>Giỏ hàng</span>
                  </div>
                </>
              )}
            </div>
          </div>
        </Col>
      </WrapperHeader>
    </div>
  );
};

export default HeaderComponent