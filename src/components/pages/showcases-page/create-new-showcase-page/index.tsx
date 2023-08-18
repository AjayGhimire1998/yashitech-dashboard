import * as React from "react";
import { Container, ShowcaseForm } from "../../../../styles/global";
import StaticContent from "../../../helper/pages-helpers/homepage-helpers/StaticContent";
import { ShowcaseWrapper } from "../each-showcase-page/styles";

interface INewShowCasePageProps {}

const NewShowCasePage: React.FunctionComponent<
  INewShowCasePageProps
> = () => {
  const attributes = [
    "title",
    "showcase_type",
    "year",
    "client",
    "role",
    "ask",
    "solution",
  ];
  return (
    <Container>
      <StaticContent history="showcases" />
      <ShowcaseWrapper>
        <ShowcaseForm attributes={attributes}>
          <div>
            <label htmlFor="">Thumbnail</label>
            <input type="file"></input>
          </div>
        </ShowcaseForm>
      </ShowcaseWrapper>
    </Container>
  );
};

export default NewShowCasePage;
