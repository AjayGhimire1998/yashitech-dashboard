import * as React from "react";
import { ShowcaseWrapper } from "./styles";
import { Container, LoadingSpinner, Message } from "../../../../styles/global";
import StaticContent from "../../../helper/pages-helpers/homepage-helpers/StaticContent";
import { useParams } from "react-router-dom";
import { viewShowcase } from "../../../../services/other-services/showcases-services";
import { EachShowcase } from "..";

type ShowCaseParam = {
  id: string | undefined;
};

interface EachShowCaseResponse {
  error?: string;
  message?: string;
  showcase: {
    data: EachShowcase;
  };
}

const EachShowCase: React.FunctionComponent = () => {
  const [showcaseData, setShowcaseData] =
    React.useState<EachShowCaseResponse>();
  const [isLoading, setIsLoading] = React.useState<boolean>();
  const [message, setMessage] = React.useState<string>();
  const { id } = useParams<ShowCaseParam>();

  const getShowcaseData = async (id: string | undefined) => {
    try {
      setIsLoading(true);
      const res = await viewShowcase(id);
      setShowcaseData(res.data);
      console.log(showcaseData);
    } catch (error: any) {
      setMessage(
        error.response.data.error || "Something went wrong. Try again."
      );
      setIsLoading(false);
      console.log(error);
      console.log(error.response.data.error);
    }
  };

  React.useEffect(() => {
    getShowcaseData(id);
  }, []);

  React.useEffect(() => {
    if (showcaseData) {
      setMessage(showcaseData.message || showcaseData.error);
      setIsLoading(false);
    }
  }, [showcaseData]);

  return (
    <Container>
      <StaticContent history={"showcases"} />
      <br />
      <br />
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
      <br />
      {isLoading ? (
        <LoadingSpinner color="black" height="50" width="50" />
      ) : showcaseData ? (
        <>
          <ShowcaseWrapper>
            <p>{showcaseData.showcase.data.attributes.title}</p>
          </ShowcaseWrapper>
        </>
      ) : (
        <p></p>
      )}
    </Container>
  );
};

export default EachShowCase;
