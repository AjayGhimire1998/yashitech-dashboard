import * as React from "react";
import { Container, ShowcaseForm } from "../../../../styles/global";
import StaticContent from "../../../helper/pages-helpers/homepage-helpers/StaticContent";
import { ShowcaseWrapper } from "../view-each-showcase-page/styles";
import { createNewShowcase } from "../../../../services/other-services/showcases-services";

interface INewShowCasePageProps {}
interface NewShowCasePayload{
  showcase: {
    title: string;
    showcase_type: string;
    site_link: string;
    year: string;
    client: string;
    role: string;
    ask: string;
    solution: string;
    showcase_categories: string[];
    thumbnail: File;
    ss: File
  }
}

const NewShowCasePage: React.FunctionComponent<INewShowCasePageProps> = () => {
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

  const [thumbnail, setThumbnail] = React.useState<string>();
  const [ss, setSs] = React.useState<string>();
  const [selectedCategories, setSelectedCategories] = React.useState<
    Array<string>
  >([]);
  const [payload, setPayload] = React.useState<NewShowCasePayload>();

  //file input
  const handleFileInput = (
    e: React.ChangeEvent<HTMLInputElement>,
    which: string
  ): void => {
    if (!e.target.files) return;
    if (which === "thumbnail") {
      setThumbnail(URL.createObjectURL(e.target.files[0]));
    } else if (which === "ss") {
      setSs(URL.createObjectURL(e.target.files[0]));
    } else if (which === "clear") {
      e.target.files = null;
    }
  };

  //handling radio input
  const onCheckBoxClick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checkboxVal = e.target.value;
    setSelectedCategories((prevSelectedCategories) => {
      if (prevSelectedCategories.includes(checkboxVal)) {
        return prevSelectedCategories.filter((cat) => cat !== checkboxVal);
      } else {
        return [...prevSelectedCategories, checkboxVal];
      }
    });
  };

  React.useEffect(() => {
    console.log(selectedCategories);
  }, [selectedCategories]);

  //resetting input
  const inputOneRef: any = React.useRef(null);
  const inputTwoRef: any = React.useRef(null);
  const cancelFileInput = (which: string): void => {
    if (which === "thumbnail") {
      if (inputOneRef.current) {
        inputOneRef.current.value = null;
        setThumbnail("");
      }
    } else if ("ss") {
      if (inputTwoRef.current) {
        inputTwoRef.current.value = null;
        setSs("");
      }
    }
  };

  //handleSubmit 
  const handleSubmit = async(payload: object) => {
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
      <StaticContent history="showcases" />
      <ShowcaseWrapper>
        <ShowcaseForm attributes={attributes} btnText="Create" onClick={() => handleSubmit({})}>
          <div>
            <label htmlFor="showcase_categories_input">
              Showcase_Categories:
            </label>

            {checkboxValues.map((checkbox, index) => {
              return (
                <div key={index}>
                  <label style={{ fontSize: "15px" }}>
                    <input
                      type="checkbox"
                      value={checkbox}
                      // disabled={selectedCategories.includes("All") && index !== 0}
                      onChange={(e) => onCheckBoxClick(e)}
                    />
                    {checkbox}
                  </label>
                </div>
              );
            })}
            <br/>
            <div>
              <p>Selected Categories: {selectedCategories + " "}</p>
            </div>
          </div>
          <div>
            <label htmlFor="thumbnail_input">Thumbnail</label>
            <input
              type="file"
              className="thumbnail_input"
              onChange={(e) => handleFileInput(e, "thumbnail")}
              ref={inputOneRef}
            ></input>
            {thumbnail && <img src={thumbnail} alt="thumbnail" />}
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
            )}
          </div>
          <div>
            <label htmlFor="ss_input">Thumbnail</label>
            <input
              type="file"
              className="ss_input"
              onChange={(e) => handleFileInput(e, "ss")}
              ref={inputTwoRef}
            ></input>
            {ss && <img src={ss} alt="ss" />}
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
            )}
          </div>
        </ShowcaseForm>
      </ShowcaseWrapper>
    </Container>
  );
};

export default NewShowCasePage;
