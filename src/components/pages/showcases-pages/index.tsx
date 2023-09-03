import * as React from "react";
import { Container, LoadingSpinner, Message } from "../../../styles/global";
import StaticContent from "../../helper/pages-helpers/global-pages-helpers/StaticContent";
import {
  checkIfEven,
  deleteShowcase,
  getShowcases,
} from "../../../services/other-services/showcases-services";
import { ShowcaseColumn, ShowcasesWrapper } from "./styles";
import { FooterContent } from "../pages-styles";

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

const ShowCasesPage: React.FunctionComponent = () => {
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
    } catch (err: any) {
      setIsLoading(false);
      setMessage(
        err.response.data.error || "Something went wrong. Try Reloading."
      );
      // console.log(err);
    }
  }, []);

  const deleteShowCase = async (id: string) => {
    try {
      setIsDeleteLoading(id);
      alert(`Do you really want to delete showcase ${id}`)
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
      setDeleteMessage(
        error.response.data.error || "Something went wrong. Try again."
      );
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
    // const loaderInterval = setInterval(() => {
    //   if (!showcasesData) {
    //     setIsLoading(false);
    //   }
    // }, 5000);
    // return () => clearInterval(loaderInterval);
  }, [showcasesData]);

  return (
    <Container>
      <StaticContent history="" />
      <br />
      <h2>Show Cases Data</h2>
      <br />
      <br />
      {isLoading ? (
        <LoadingSpinner color="#440a70" height="50" width="50" />
      ) : null}
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
      {showcasesData ? (
        <>
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

          <ShowcasesWrapper
            value1="Id"
            value2="Title"
            value3="Client"
            value4="Year"
          >
            {showcasesData.showcases.data.map((show: EachShowcase, index: number) => (
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
                bgColor={checkIfEven(index + 1) ? "#e1dfdf" : "white"}
                onClick={() => {
                  deleteShowCase(show.id);
                }}
              />
            ))}
          </ShowcasesWrapper>
          <br />
          <a href="/showcases/new">Create New Showcase</a>
        </>
      ) : (
        <p>Internal Server Error. Try Reloading.</p>
      )}
      <br />
      <br />
      <FooterContent />
    </Container>
  );
};

export default ShowCasesPage;
