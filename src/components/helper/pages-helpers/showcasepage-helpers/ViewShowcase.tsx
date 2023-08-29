import * as React from "react";
import { titleize } from "../../../../services/other-services/showcases-services";

interface IViewShowcaseProps {
  children?: React.ReactNode;
  className?: string;
  attribute: string;
  value?: any;
}

const ViewShowcase: React.FunctionComponent<IViewShowcaseProps> = ({
  className,
  attribute,
  value,
}) => {
  return (
    <div className={className}>
      <div>
        <h4>{titleize(attribute)}</h4>
      </div>
      <div>
        {value?.url ? (
          <>
            <a href={value.url}>{value.url}</a>
            <br />
            <img src={value.url} alt="thumbnail_or_ss_image" />
          </>
        ) : (
          <p>{Array.isArray(value) ? value.map((val) => val + ", ") : value}</p>
        )}
      </div>
    </div>
  );
};

export default ViewShowcase;
