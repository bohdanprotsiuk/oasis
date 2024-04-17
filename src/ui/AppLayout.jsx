import { Outlet } from "react-router-dom";
import Header from "./Header";
import styled from "styled-components";
import SideBar from "./SideBar";

const Main = styled.main`
    background-color: var(--color-grey-50);
    padding: 4rem 4.8rem 6.4rem;
    overflow-y: scroll;
`;

const StyledAppLayout = styled.div`
    display: grid;
    grid-template-columns: 26rem 1fr;
    grid-template-rows: auto 1fr;
    height: 100vh;
`;

const Container = styled.div`
    display: flex;
    max-width: 120rem;
    flex-direction: column;
    gap: 3.2rem;
`;

export default function AppLayout() {
    return (
        <StyledAppLayout>
            <Header />
            <SideBar />
            <Main>
                <Container>
                    <Outlet />
                </Container>
            </Main>
        </StyledAppLayout>
    );
}
