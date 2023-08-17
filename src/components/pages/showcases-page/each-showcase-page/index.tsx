import * as React from "react";
import { ShowcaseWrapper } from "./styles";
import { Container } from "../../../../styles/global";
import StaticContent from "../../../helper/pages-helpers/homepage-helpers/StaticContent";
import { useParams } from "react-router-dom";
import { viewShowcase } from "../../../../services/other-services/showcases-services";
import { EachShowcase } from "..";

type ShowCaseParam = {
  id: string;
};

interface EachShowCaseResponse {
  error?: string;
  message?: string;
  showcase?: {
    data: [EachShowcase];
  };
}

const EachShowCase: React.FunctionComponent = () => {
  const [showcaseData, setShowcaseData] = React.useState<object>();
  const [isLoading, setIsLoading] = React.useState<boolean>();
  const [message, setMessage] = React.useState<string>();
  const { id } = useParams<ShowCaseParam>();


  const getShowcaseData = React.useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await viewShowcase("1");
      setShowcaseData(res.data);
      console.log(showcaseData);
    } catch (error: any) {
      setMessage("Something went wrong. Try reloading.");
      setMessage(error.response.data.error);
      console.log(error);
      
      console.log(error.response.data.error);
      
    }
  },[])

  React.useEffect(() => {
    getShowcaseData();
  }, [getShowcaseData]);

  React.useEffect(() => {
    if(showcaseData){
      setIsLoading(false);
      // setMessage(showcaseData.message || showcaseData.error)
    }
  }, [showcaseData]);

  return (
    <Container>
      <StaticContent history={"showcases"} />
      <ShowcaseWrapper></ShowcaseWrapper>
    </Container>
  );
};

export default EachShowCase;
