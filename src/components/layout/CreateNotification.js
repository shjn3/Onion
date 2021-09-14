import React from "react";
import styled from "styled-components";

const CreateNotification = (props) => {
  const { title } = props;
  return (
    <Container>
      <div>
        Không tìm thấy <span style={{ color: "rgb(156,39,176)" }}>{title}</span>
      </div>
      <div>
        Xin vui lòng thêm{" "}
        <span style={{ color: "rgb(156,39,176)" }}>{title}</span>
        &nbsp;mới
      </div>
    </Container>
  );
};

export default CreateNotification;

const Container = styled.div`
  height: 100%;
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  font-size: 2rem;
  text-align: center;
  font-weight: 600;
  @media only screen and (max-width: 800px) {
    font-size: 1rem;
  }
`;
