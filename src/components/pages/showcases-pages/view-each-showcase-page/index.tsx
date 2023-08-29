import * as React from "react";
import { ShowcaseData, ShowcaseWrapper } from "./styles";
import { Container, LoadingSpinner, Message } from "../../../../styles/global";
import StaticContent from "../../../helper/pages-helpers/global-pages-helpers/StaticContent";
import { useParams } from "react-router-dom";
import {
  arrayOFAttributes,
  deleteShowcase,
  viewShowcase,
} from "../../../../services/other-services/showcases-services";
import { EachShowcase } from "..";
import { ShowcaseColumn } from "../styles";
import { useNavigate } from "react-router-dom";
import { FooterContent } from "../../pages-styles";

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
  const navigate = useNavigate();

  const [showcaseData, setShowcaseData] =
    React.useState<EachShowCaseResponse>();
  const [isLoading, setIsLoading] = React.useState<boolean>();
  const [isDeleteLoading, setIsDeleteLoading] = React.useState<boolean>();
  const [message, setMessage] = React.useState<string>();
  const { id } = useParams<ShowCaseParam>();

  const getShowcaseData = React.useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await viewShowcase(id);
      setShowcaseData(res.data);
    } catch (error: any) {
      setIsLoading(false);
      setMessage(
        error.response.data.error || "Something went wrong. Try again."
      );
      console.log(error);
      console.log(error.response.data.error);
    }
  }, [id]);

  const handleDelete = async () => {
    try {
      setIsDeleteLoading(true);
      const res = await deleteShowcase(id);
      if (res.status === 200) {
        setMessage(res.data.message);
        setInterval(() => {
          setIsDeleteLoading(false);
          navigate("/showcases");
        }, 1000);
      }
    } catch (error: any) {
      console.log(error);
      setIsDeleteLoading(false);
      setMessage(error.response.data.error);
    }
  };

  React.useEffect(() => {
    getShowcaseData();
  }, [getShowcaseData]);

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
      {isLoading ? (
        <LoadingSpinner color="#440a70" height="50" width="50" />
      ) : showcaseData ? (
        <>
          <ShowcaseWrapper>
            {arrayOFAttributes(showcaseData.showcase.data.attributes).map(
              (attr, index) => {
                return (
                  <ShowcaseData
                    key={index}
                    attribute={attr}
                    value={showcaseData.showcase.data.attributes[attr] || "Null"}
                  />
                );
              }
            )}
            <br />
            <ShowcaseColumn
              value2=""
              value3=""
              value4=""
              id={id}
              bgColor="white"
              href2={`${id}/edit`}
              isDeleting={isDeleteLoading}
              onClick={handleDelete}
            />
          </ShowcaseWrapper>
        </>
      ) : (
        <p></p>
      )}
      <br/>
      <br/>
      <FooterContent />
    </Container>
  );
};

export default EachShowCase;
