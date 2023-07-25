import * as React from "react";
import { Button, Container, Logo } from "../../../styles/global";
import {
  AttributeKey,
  ContentWrap,
  DataValue,
  FormTextArea,
  Pagination,
  PaginationWrapper,
} from "../styles";
import {
  getHomePages,
  updateHomePages,
} from "../../../services/other-services/homepage-services";
import Spinner from "../../helper/global-helpers/Spinner";

interface HomePageData {
  home_page_data: {
    data: {
      id: any;
      attributes: {
        who_are_we: string;
        what_we_do: string;
        why_us: string;
      };
    };
  };
}

const HomePage: React.FunctionComponent = () => {
  const [homePageData, setHomePageData] = React.useState<HomePageData>();
  const [isLoading, setIsLoading] = React.useState(false);
  const [isEditing, setIsEditing] = React.useState(false);
  const [error, setError] = React.useState("");

  const getHomePageData = async () => {
    try {
      setIsLoading(true);
      const allData = await getHomePages();
      setHomePageData(allData);
      setPayload({
        what_we_do: allData?.home_page_data.data.attributes.what_we_do || "",
        who_are_we: allData?.home_page_data.data.attributes.who_are_we || "",
        why_us: allData?.home_page_data.data.attributes.why_us || "",
      });
    } catch (error) {
      console.log(error);

      setError("Something went wrong. Try again.");
    } finally {
      setIsLoading(false);
    }
  };
  React.useEffect(() => {
    getHomePageData();
  }, []);

  const { id } = homePageData?.home_page_data.data || { id: 0 };
  const { who_are_we, what_we_do, why_us } =
    homePageData?.home_page_data.data.attributes || {};

  const [payload, setPayload] = React.useState({
    who_are_we: "",
    what_we_do: "",
    why_us: "",
  });
  const handleInputChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ): void => {
    const { name, value } = event.target;
    setPayload((prevPayload) => ({
      ...prevPayload,
      [name]: value,
    }));
  };

  //updating data
  const payloadData = { home_yashi_page: payload };
  const handleSave = async () => {
    try {
      setIsLoading(true);
      const res = await updateHomePages(payloadData, id);
      console.log(res);
      if(res){
        await getHomePageData();
      }
    } catch (error) {
      console.log("Error:", error);
      setError("Something went wrong. Try again.");
    } finally {
      setIsEditing(false);
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <Logo />
      <PaginationWrapper>
        <Pagination href="/"> {"<- Back"}</Pagination>
      </PaginationWrapper>
      {isLoading ? (
        <Spinner color="#440a70" height="50" width="50" />
      ) : (
        <>
          <br />
          <br />
          <ContentWrap>
            <AttributeKey>What We do</AttributeKey>
            {isEditing ? (
              <FormTextArea
                rols={5}
                cols={50}
                onChange={handleInputChange}
                name="what_we_do"
                value={payload["what_we_do"]}
              />
            ) : (
              <DataValue>{what_we_do}</DataValue>
            )}
          </ContentWrap>
          <ContentWrap>
            <AttributeKey>Who are We</AttributeKey>
            {isEditing ? (
              <FormTextArea
                rols={5}
                cols={50}
                onChange={handleInputChange}
                name="who_are_we"
                value={payload["who_are_we"]}
              />
            ) : (
              <DataValue>{who_are_we}</DataValue>
            )}
          </ContentWrap>
          <ContentWrap>
            <AttributeKey>Why Us</AttributeKey>
            {isEditing ? (
              <FormTextArea
                rols={5}
                cols={50}
                onChange={handleInputChange}
                name="why_us"
                value={payload["why_us"]}
              />
            ) : (
              <DataValue>{why_us}</DataValue>
            )}
          </ContentWrap>
          <br />
          <ContentWrap>
            {isEditing ? (
              <Button
                bgColor="#440a70"
                txtColor="white"
                hoverBg="green"
                className="edit-button"
                children="Save"
                onClick={handleSave}
              />
            ) : (
              <Button
                bgColor="#440a70"
                txtColor="white"
                hoverBg="green"
                className="edit-button"
                children="Edit"
                onClick={() => setIsEditing(true)}
              />
            )}
          </ContentWrap>
        </>
      )}
    </Container>
  );
};

export default HomePage;
