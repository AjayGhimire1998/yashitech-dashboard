import * as React from "react";
import { titleize } from "../../../../services/other-services/showcases-services";

interface IViewShowcaseProps {
  children?: React.ReactNode;
  className?: string;
  attribute: string;

  thumbnail?: string;
  ss?: string;
  value?: string;
}

const ViewShowcase: React.FunctionComponent<IViewShowcaseProps> = ({
  className,
  attribute,
  value,
  thumbnail,
  ss,
}) => {
  return (
    <div className={className}>
      <div>
        <h4>{titleize(attribute)}</h4>
      </div>
      <div>
        {thumbnail && ss? <img src={thumbnail && ss} alt="showcase_images"></img> : <p>{value}</p>}
      </div>
    </div>
  );
};

export default ViewShowcase;
