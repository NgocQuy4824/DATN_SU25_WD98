import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import { Card, Statistic, Tooltip } from "antd";
import styled from "styled-components";
import tw from "twin.macro";

const StyledCard = styled(Card)`
  ${tw`h-[200px] w-full transform transition-all duration-300 hover:-translate-y-1 hover:shadow-lg flex flex-col p-5`}
`;

const HeaderContainer = styled.div`
  ${tw`mb-4 flex h-[72px] items-start justify-between`}
`;

const TitleContentWrapper = styled.div`
  ${tw`flex-grow`}
`;

const TitleRow = styled.div`
  ${tw`flex items-center gap-2`}
`;

const TitleHeading = styled.h3`
  ${tw`line-clamp-1 text-base font-semibold text-gray-800`}
`;

const QuestionIcon = styled(QuestionCircleOutlined)`
  ${tw`ml-2 cursor-help text-gray-400 hover:text-gray-600`}
`;

const SubtitleText = styled.p`
  ${tw`mt-1 line-clamp-1 text-sm text-gray-500`}
`;

const IconCircle = styled.div`
  ${tw`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-blue-50`}
`;

const IconSpan = styled.span`
  ${tw`text-xl text-blue-500`}
`;

const FooterContainer = styled.div`
  ${tw`flex flex-grow flex-col justify-end`}
`;

const RateSpan = styled.span`
  ${tw`ml-2 flex items-center text-sm`}
  ${({ levelUp, levelDown }) => {
    if (levelUp) return tw`text-emerald-500`;
    if (levelDown) return tw`text-rose-500`;
    return tw`text-gray-500`;
  }}
`;

const RateArrowIcon = styled.span`
  ${tw`ml-1`}
`;

const ProgressBarWrapper = styled.div`
  ${tw`mt-3 h-1 w-full overflow-hidden rounded-full bg-gray-100`}
`;

const ProgressBarFill = styled.div`
  ${tw`h-full transition-all duration-500`}
  ${({ levelUp }) => (levelUp ? tw`bg-emerald-500` : tw`bg-rose-500`)}
`;

const CardDataStats = ({
  title,
  total,
  rate,
  levelUp,
  levelDown,
  icon,
  subtitle,
  tooltip,
  rateTooltip,
}) => {
  return (
    <StyledCard>
      <HeaderContainer>
        <TitleContentWrapper>
          <TitleRow>
            <TitleHeading>
              {title}
              <Tooltip title={tooltip}>
                <QuestionIcon />
              </Tooltip>
            </TitleHeading>
          </TitleRow>
          {subtitle && <SubtitleText>{subtitle}</SubtitleText>}
        </TitleContentWrapper>
        <IconCircle>
          <IconSpan>{icon}</IconSpan>
        </IconCircle>
      </HeaderContainer>

      <FooterContainer>
        <Statistic
          value={total}
          valueStyle={{
            fontSize: "1.5rem",
            fontWeight: "600",
            color: "#1f2937",
            lineHeight: "1.5",
          }}
          suffix={
            rate && (
              <Tooltip title={rateTooltip}>
                <RateSpan levelUp={levelUp} levelDown={levelDown}>
                  {rate}
                  {levelUp && (
                    <RateArrowIcon>
                      <ArrowUpOutlined />
                    </RateArrowIcon>
                  )}
                  {levelDown && (
                    <RateArrowIcon>
                      <ArrowDownOutlined />
                    </RateArrowIcon>
                  )}
                </RateSpan>
              </Tooltip>
            )
          }
        />

        {(levelUp || levelDown) && (
          <ProgressBarWrapper>
            <ProgressBarFill
              levelUp={levelUp}
              style={{
                width: `${rate ? Math.min(parseFloat(rate), 100) : 0}%`,
              }}
            />
          </ProgressBarWrapper>
        )}
      </FooterContainer>
    </StyledCard>
  );
};

export default CardDataStats;
