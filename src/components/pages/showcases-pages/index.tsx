import * as React from "react";
import { Container, LoadingSpinner, Message } from "../../../styles/global";
import StaticContent from "../../helper/pages-helpers/homepage-helpers/StaticContent";
import {
  checkIfEven,
  createNewShowcase,
  deleteShowcase,
  getShowcases,
} from "../../../services/other-services/showcases-services";
import { ShowcaseColumn, ShowcasesWrapper } from "./styles";

interface ShowCasesResponse {
  message?: string;
  error?: string;
  showcases: {
    data: [EachShowcase];
  };
}

export interface EachShowcase {
  id: string;
  type: string;
  attributes: any;
}

const ShowCasesPage: React.FunctionComponent = (props) => {
  const [showcasesData, setShowcasesData] = React.useState<ShowCasesResponse>();
  const [isLoading, setIsLoading] = React.useState<boolean>();
  const [message, setMessage] = React.useState<string>();
  const [isDeleteLoading, setIsDeleteLoading] = React.useState<string>();
  const [deleteMessage, setDeleteMessage] = React.useState<string>();

  const getShowCasesData = React.useCallback(async () => {
    try {
      setIsLoading(true);
      const getShowcasesResponse = await getShowcases();
      setShowcasesData(getShowcasesResponse.data);
    } catch (err) {
      setIsLoading(false);
      setMessage("Something went wrong. Try Reloading.");
      console.log(err);
    }
  }, []);

  const deleteShowCase = async (id: string) => {
    try {
      setIsDeleteLoading(id);
      const deleteShowcaseResponse = await deleteShowcase(id);
      if (deleteShowcaseResponse.status === 200) {
        setDeleteMessage(
          deleteShowcaseResponse.data.message ||
            deleteShowcaseResponse.data.error
        );
        await getShowCasesData();
      }
    } catch (error: any) {
      setIsDeleteLoading("");
      setDeleteMessage(error.response.data.error || "Something went wrong. Try again.");
      console.log(error);
      console.log(error.response.data.error);
    }
  };

  React.useEffect(() => {
    getShowCasesData();
  }, [getShowCasesData]);

  React.useEffect(() => {
    if (showcasesData) {
      setMessage(showcasesData.message || showcasesData.error);
      setIsLoading(false);
    }
    const loaderInterval = setInterval(() => {
      if (!showcasesData) {
        setIsLoading(false);
      }
    }, 5000);
    return () => clearInterval(loaderInterval);
  }, [showcasesData]);

  const createNew = async () => {
    try {
      const payload: object = {
        showcase: {
          title: "Newest Project",
          year: "2050",
          client: "Meta Corp X hex",
          ask: "suppp, u good? lorem fashjkgskgskafkasjgfsafjgsajgfsafgsafsagfasfjhfjhahsfjhdavgsajgfsjgfjhgasfjashjfgjhsaghjfgasjfghkjsagfjagsjh suppp, u good? lorem fashjkgskgskafkasjgfsafjgsajgfsafgsafsagfasfjhfjhahsfjhdavgsajgfsjgfjhgasfjashjfgjhsaghjfgasjfghkjsagfjagsjh suppp, u good? lorem fashjkgskgskafkasjgfsafjgsajgfsafgsafsagfasfjhfjhahsfjhdavgsajgfsjgfjhgasfjashjfgjhsaghjfgasjfghkjsagfjagsjh",
          // thumbnail: "https://yashitech-website.s3.ap-southeast-2.amazonaws.com/qwmwq28l4uybczrzbftp6um3c5rk?response-content-disposition=inline%3B%20filename%3D%22PY%20Internship%20Acknowledgement%20%2528Provider%20Placed%2529_V1.3.pdf%22%3B%20filename%2A%3DUTF-8%27%27PY%2520Internship%2520Acknowledgement%2520%2528Provider%2520Placed%2529_V1.3.pdf&response-content-type=application%2Fpdf&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAWS2EFXTG3L3EJFX3%2F20230818%2Fap-southeast-2%2Fs3%2Faws4_request&X-Amz-Date=20230818T060923Z&X-Amz-Expires=172800&X-Amz-SignedHeaders=host&X-Amz-Signature=51b6599fddba8a7e6d0bf775999b4f076559614e2d43c37b99f28345617dba5a"
        },
      };
      const res = await createNewShowcase(payload);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <StaticContent history="" />
      <br />
      <h2>Show Cases Data</h2>
      <br />
      <br />
      {isLoading ? (
        <LoadingSpinner color="#440a70" height="50" width="50" />
      ) : showcasesData ? (
        <>
          {message ? (
            <Message
              bgColor="#440a70"
              txtColor="white"
              onClick={() => {
                setMessage("");
              }}
            >
              {message}
            </Message>
          ) : null}
          <br />
          {deleteMessage ? (
            <Message
              bgColor="#440a70"
              txtColor="white"
              onClick={() => {
                setDeleteMessage("");
              }}
            >
              {deleteMessage}
            </Message>
          ) : null}
          <br />
          <br />

          <ShowcasesWrapper>
            {showcasesData.showcases.data.map((show: any) => (
              <ShowcaseColumn
                key={show.id}
                value1={show.id}
                value2={show.attributes.title}
                value3={show.attributes.client}
                value4={show.attributes.year}
                id={show.id}
                href1={`showcases/${show.id}`}
                href2={`showcases/${show.id}/edit`}
                isDeleting={isDeleteLoading === show.id}
                bgColor={checkIfEven(parseInt(show.id)) ? "#e1dfdf" : "white"}
                onClick={() => {
                  deleteShowCase(show.id);
                }}
              />
            ))}
          </ShowcasesWrapper>
          <br />
          <a href="/showcases/new" onClick={createNew}>Create New Showcase</a>
        </>
      ) : (
        <p>Internal Server Error. Try Reloading.</p>
      )}
    </Container>
  );
};

export default ShowCasesPage;
