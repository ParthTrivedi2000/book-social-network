import React from 'react';
import { Outlet } from 'react-router-dom';
import Menu from '../Menu/Menu';
import { MainWrapper, ContentWrapper } from './Main.styled';

const Main: React.FC = () => {
  return (
    <MainWrapper>
      <Menu />
      <ContentWrapper>
        <Outlet /> {/* React Router's equivalent to Angular's router-outlet */}
      </ContentWrapper>
    </MainWrapper>
  );
};

export default Main;
