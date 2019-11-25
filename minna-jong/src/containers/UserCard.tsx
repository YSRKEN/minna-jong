import React, { useContext } from 'react';
import { ApplicationContext } from 'states/Application';
import styled from 'styled-components';

const cardWidth = 24;
const cardHeight = 8;
const iconSize = 6;
const spacing = 1;
const fontSizeL = 2.4;
const fontSize = 1.5;

const NonAuthCard = styled.button`
  width: ${cardWidth}rem;
  height: ${cardHeight}rem;
  border: 1px solid black;
  font-size: ${fontSizeL}rem;
`;
const AuthCard = styled.div`
  position: relative;
  width: ${cardWidth}rem;
  height: ${cardHeight}rem;
  border: 1px solid black;
`;
const UserName = styled.span`
  position: absolute;
  font-size: ${fontSize}rem;
  width: ${cardWidth - spacing * 3 - iconSize}rem;
  left: ${spacing * 2 + iconSize}rem;
  top: 1rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
const ScreenName = styled.span`
  position: absolute;
  font-size: ${fontSize}rem;
  width: ${cardWidth - spacing * 3 - iconSize}rem;
  left: ${spacing * 2 + iconSize}rem;
  top: ${spacing * 2 + fontSize}rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
const Icon = styled.img`
  position: absolute;
  width: ${iconSize}rem;
  height: ${iconSize}rem;
  left: ${spacing}rem;
  top: ${spacing}rem;
  display: inline-block;
  border: 1px solid black;
`;

const UserCard: React.FC = () => {
  const { userName, screenName, iconUrl, dispatch } = useContext(
    ApplicationContext,
  );

  if (userName === '') {
    const authByTwitter = () => dispatch({ type: 'AuthUser', message: '' });

    return (
      <NonAuthCard type="button" onClick={authByTwitter}>
        Twitterでログイン
      </NonAuthCard>
    );
  }

  return (
    <AuthCard>
      <UserName>{userName}</UserName>
      <ScreenName>@{screenName}</ScreenName>
      <Icon src={iconUrl} alt={userName} />
    </AuthCard>
  );
};

export default UserCard;
