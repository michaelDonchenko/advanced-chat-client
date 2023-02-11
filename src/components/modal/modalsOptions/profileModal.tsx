import useAuthContext from "@/store/authContext";
import styled from "styled-components";

export const ProfileModal = () => {
  const {user} = useAuthContext();

  return (
    <Container>
      <Title>My Profile</Title>

      <Content>
        <Image src={user?.photo} alt="profile image" />

        <div>
          <h3>Id: {user?.id}</h3>
          <h3>Username: {user?.username}</h3>
        </div>
      </Content>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 20px 20px 20px;
`;

const Content = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.h2`
  margin-bottom: 20px;
  text-align: center;
`;

const Image = styled.img`
  width: 90px;
  height: 90px;
  border-radius: 50%;
`;
