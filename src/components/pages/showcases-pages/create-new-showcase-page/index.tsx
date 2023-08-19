import * as React from "react";
import { Container, ShowcaseForm } from "../../../../styles/global";
import StaticContent from "../../../helper/pages-helpers/homepage-helpers/StaticContent";
import { ShowcaseWrapper } from "../view-each-showcase-page/styles";

interface INewShowCasePageProps {}
type attr = Array<string>;

const NewShowCasePage: React.FunctionComponent<INewShowCasePageProps> = () => {
  const attributes: attr = [
    "title",
    "showcase_type",
    "year",
    "client",
    "role",
    "ask",
    "solution",
  ];

  const [thumbnail, setThumbnail] = React.useState<string>();
  const [ss, setSs] = React.useState<string>();
  const [selectedCategory, setSelectedCategory] = React.useState<string>();
  const [selectedCategories, setSelectedCategories] = React.useState<
    Array<string>
  >([]);

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
  const onRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedCategory(e.target.value);
  };

  React.useEffect(() => {
    if (selectedCategory)
      setSelectedCategories((prevSelectedCategories) => {
        if (!prevSelectedCategories.includes(selectedCategory))
          return [...prevSelectedCategories, selectedCategory];
        return prevSelectedCategories;
      });
      console.log(selectedCategory);
      console.log(selectedCategories);
      
  }, [selectedCategory, selectedCategories]);

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
  return (
    <Container>
      <StaticContent history="showcases" />
      <ShowcaseWrapper>
        <ShowcaseForm attributes={attributes} btnText="Create">
          <div>
            <label htmlFor="showcase_categories_input">
              Showcase_Categories:
            </label>
            <div>
              <label style={{ fontSize: "15px" }}>
                <input
                  type="checkbox"
                  value="All"
                  // checked={selectedCategories.includes("All")}
                  onChange={(e) => onRadioChange(e)}
                />
                All
              </label>
            </div>
            <div>
              <label style={{ fontSize: "15px" }}>
                <input
                  type="checkbox"
                  value="UI/UX"
                  // checked={selectedCategories.includes("UI/UX")}
                  onChange={(e) => onRadioChange(e)}
                />
                UI/UX
              </label>
            </div>
            <div>
              <label style={{ fontSize: "15px" }}>
                <input
                  type="checkbox"
                  value="Website"
                  // checked={selectedCategories.includes("Website")}
                  onChange={(e) => onRadioChange(e)}
                />
                Website
              </label>
            </div>
            <div>
              <label style={{ fontSize: "15px" }}>
                <input
                  type="checkbox"
                  value="Mobile App"
                  // checked={selectedCategories.includes("Mobile App")}
                  onChange={(e) => onRadioChange(e)}
                />
                Mobile App
              </label>
            </div>
            <div>
              <ul>
                <li>selectd: {selectedCategories}</li>
              </ul>
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
