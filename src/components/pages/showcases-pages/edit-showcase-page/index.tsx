import * as React from "react";
import { Container, ShowcaseForm } from "../../../../styles/global";
import StaticContent from "../../../helper/pages-helpers/homepage-helpers/StaticContent";
import { ShowcaseWrapper } from "../view-each-showcase-page/styles";
import { useParams } from "react-router-dom";
import { viewShowcase } from "../../../../services/other-services/showcases-services";

interface IEditShowCaseProps {}
type EditShowCasePayload = {
  showcase: {
    title: string;
    showcase_type: string;
    site_link: string;
    year: string;
    client: string;
    role: string;
    ask: string;
    solution: string;
    categories: string[];
    thumbnail: Blob | null;
    ss: Blob | null;
  };
};

type ParamRef = {
  id: string | undefined;
};

const EditShowCase: React.FunctionComponent<IEditShowCaseProps> = (props) => {
  const attributes: Array<string> = [
    "title",
    "showcase_type",
    "site_link",
    "year",
    "client",
    "role",
    "ask",
    "solution",
  ];
  const checkboxValues: string[] = ["UI/UX", "Website", "Mobile App"];
  const inputOneRef: any = React.useRef(null);
  const inputTwoRef: any = React.useRef(null);
  const { id } = useParams<ParamRef>();

  //states
  // const [thumbnail, setThumbnail] = React.useState<string>();
  // const [ss, setSs] = React.useState<string>();
  const [payload, setPayload] = React.useState<EditShowCasePayload["showcase"]>(
    {
      title: "",
      showcase_type: "",
      site_link: "",
      year: "",
      client: "",
      role: "",
      ask: "",
      solution: "",
      categories: [],
      thumbnail: null,
      ss: null,
    }
  );

  async function getShowCaseData(id: string | undefined) {
    try {
      const res = await viewShowcase(id);
      console.log(res.data);
      setPayload(res.data.showcase.data.attributes);
    } catch (error) {
      console.log(error);
    }
  }

  function handleTextAreaChange(
    e: React.ChangeEvent<HTMLTextAreaElement>
  ): void {}

  function handleSubmit(): void {
    throw new Error("Function not implemented.");
  }

  function handleFileInput(
    e: React.ChangeEvent<HTMLInputElement>,
    arg1: string
  ): void {
    throw new Error("Function not implemented.");
  }

  function cancelFileInput(arg0: string): void {
    throw new Error("Function not implemented.");
  }

  //side effects
  React.useEffect(() => {
    if (id) getShowCaseData(id);
    if (payload) {
      console.log(payload);
    }
  }, [id]);

  return (
    <Container>
      <StaticContent history="showcases" />
      <br />
      <br />
      <ShowcaseWrapper>
        <ShowcaseForm
          onChange={handleTextAreaChange}
          onClick={handleSubmit}
          attributes={attributes}
          requiredParam="showcase"
          btnText="Update"
        >
          <div>
            <label htmlFor="showcase_categories_input">
              Showcase_Categories:
            </label>

            {checkboxValues.map((checkbox, index) => {
              function onCheckBoxClick(
                e: React.ChangeEvent<HTMLInputElement>,
                checkbox: string
              ): void {
                throw new Error("Function not implemented.");
              }

              return (
                <div key={index}>
                  <label style={{ fontSize: "15px" }}>
                    <input
                      type="checkbox"
                      checked={
                        payload ? payload?.categories.includes(checkbox) : false
                      }
                      name={checkbox}
                      onChange={(e) => onCheckBoxClick(e, checkbox)}
                    />
                    {checkbox}
                  </label>
                </div>
              );
            })}
            {/* <div>
              <p>Selected Categories: {selectedCategories + " "}</p>
            </div> */}
            <br />
            <div>
              <label htmlFor="thumbnail_input">Thumbnail</label>
              <input
                type="file"
                className="thumbnail_input"
                onChange={(e) => handleFileInput(e, "thumbnail")}
                ref={inputOneRef}
              ></input>
              {/* {thumbnail && <img src={thumbnail} alt="thumbnail" />}
              {thumbnail && (
                <p
                  style={{
                    color: "red",
                    cursor: "pointer",
                    textDecoration: "underline",
                  }}
                  onClick={() => cancelFileInput("thumbnail")}
                >
                  Clear
                </p>
              )} */}
            </div>
            <br />
            <div>
              <label htmlFor="ss_input">SS</label>
              <input
                type="file"
                className="ss_input"
                onChange={(e) => handleFileInput(e, "ss")}
                ref={inputTwoRef}
              ></input>
              {/* {ss && <img src={ss} alt="ss" />}
              {ss && (
                <p
                  style={{
                    color: "red",
                    cursor: "pointer",
                    textDecoration: "underline",
                  }}
                  onClick={() => cancelFileInput("ss")}
                >
                  Clear
                </p>
              )} */}
            </div>
          </div>
        </ShowcaseForm>
      </ShowcaseWrapper>
    </Container>
  );
};

export default EditShowCase;
