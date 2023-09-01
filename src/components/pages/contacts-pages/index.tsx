import * as React from "react";
import { Container } from "../../../styles/global";
import StaticContent from "../../helper/pages-helpers/global-pages-helpers/StaticContent";
import { ShowcaseColumn, ShowcasesWrapper } from "../showcases-pages/styles";
import { checkIfEven } from "../../../services/other-services/showcases-services";

interface IContactsProps {}

const ContactsPage: React.FunctionComponent<IContactsProps> = (props) => {
    function deleteShowCase(id: any) {
       console.log("Deleted");
       
    }

  return (
    <Container>
      <StaticContent history="" />
      <br />
      <h2>Contacts Data</h2>
      <br />
      <br />

      <ShowcasesWrapper
        value1="Id"
        value2="Name"
        value3="Email"
        value4="Budget"
      >
        <ShowcaseColumn
          key="hello"
          value1="1"
          value2={"Hehe"}
          value3={"ajy@test.com"}
          value4={"2000"}
          id={"1"}
          href1={`contacts/${"1"}`}
          href2={`contacts/${"1"}/edit`}
          isDeleting={false}
          bgColor={checkIfEven(parseInt("2")) ? "#e1dfdf" : "white"}
          onClick={() => {
            deleteShowCase("1");
          }}
        />
      </ShowcasesWrapper>
    </Container>
  );
};

export default ContactsPage;
