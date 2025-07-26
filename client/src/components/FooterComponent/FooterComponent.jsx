import React from "react";
import {
  FooterContainer,
  FooterTop,
  FooterBottom,
  FooterTitle,
  FooterList,
  FooterItem,
  FooterHighlight,
  SocialItem,
  SocialList,
  FooterColumn,
} from "./style";

import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
import { SiZalo } from "react-icons/si";

const Footer = () => {
  return (
    <FooterContainer>
      <div className="container">
        <FooterTop>
          <FooterColumn>
            <FooterTitle>Hỗ trợ khách hàng</FooterTitle>
            <p>
              Gọi mua hàng: <FooterHighlight>1900 567 567</FooterHighlight>{" "}
              (08:00 - 21:30)
            </p>
            <p>
              CSKH & Khiếu nại: <FooterHighlight>1900 765 765</FooterHighlight>{" "}
              (08:00 - 21:30)
            </p>
            <p>
              Bảo hành: <FooterHighlight>1900 999 666</FooterHighlight> (08:00 -
              21:00)
            </p>
          </FooterColumn>

          <FooterColumn>
            <FooterTitle>Về PaceRun</FooterTitle>
            <FooterList>
              <FooterItem>Giới thiệu cửa hàng</FooterItem>
              <FooterItem>Tuyển dụng</FooterItem>
              <FooterItem>Góp ý & Khiếu nại</FooterItem>
              <FooterItem>Hệ thống cửa hàng</FooterItem>
            </FooterList>
          </FooterColumn>

          <FooterColumn>
            <FooterTitle>Chính sách & Hướng dẫn</FooterTitle>
            <FooterList>
              <FooterItem>Chính sách đổi trả</FooterItem>
              <FooterItem>Chính sách bảo hành</FooterItem>
              <FooterItem>Hướng dẫn mua hàng</FooterItem>
              <FooterItem>Thanh toán & Giao hàng</FooterItem>
              <FooterItem>Chính sách bảo mật</FooterItem>
            </FooterList>
          </FooterColumn>

          <FooterColumn>
            <FooterTitle>Kết nối với chúng tôi</FooterTitle>
            <SocialList>
              <SocialItem>
                <FaFacebookF size={18} />
                Facebook
              </SocialItem>
              <SocialItem>
                <FaInstagram size={18} />
                Instagram
              </SocialItem>
              <SocialItem>
                <SiZalo size={18} />
                Zalo
              </SocialItem>
              <SocialItem>
                <FaYoutube size={18} />
                YouTube
              </SocialItem>
            </SocialList>
          </FooterColumn>
        </FooterTop>

        <FooterBottom>
          <p>© 2025 Cửa hàng PaceRun - Nâng bước từng hành trình.</p>
          <p>
            Địa chỉ: 13 Trịnh Văn Bô, P. Xuân Pương, Q. Nam Từ Liêm, TP. Hà Nội.
          </p>
          <p>
            Email: <FooterHighlight>lienhe@pacerun.vn</FooterHighlight>
          </p>
        </FooterBottom>
      </div>
    </FooterContainer>
  );
};

export default Footer;
