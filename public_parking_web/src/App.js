import styled from 'styled-components';
import MapContainer from './components/Map/MapContainer';
import { MainTitle, SideBar } from './components/Content';

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

const ContentContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  width: 100%;
  background-color: white;
  overflow:hidden;
`;



function App() {
  return (
    <Container>
      <MainTitle title={"주차돌이"}></MainTitle>
      <ContentContainer>
        <SideBar></SideBar>
        <MapContainer></MapContainer>
      </ContentContainer>
    </Container>
  );
}

export default App;
