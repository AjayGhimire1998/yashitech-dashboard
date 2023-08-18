import * as React from "react";
import { titleize } from "../../../../services/other-services/showcases-services";

interface IViewShowcaseProps {
  children?: React.ReactNode;
  className?: string;
  attribute: string;
  // isForm?: boolean;
  // isCreatingNew?: boolean;
  // isEditing?: boolean;
  value?: any;
  // onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  // changedValue? :any;
}

const ViewShowcase: React.FunctionComponent<IViewShowcaseProps> = ({
  className,
  attribute,
  value,
  // onChange,
  // isForm,
  // isCreatingNew,
  // isEditing,
  // changedValue
}) => {
  return (
    <div className={className}>
      <div>
        <h4>{titleize(attribute)}</h4>
      </div>
      <div>
        {
        // isForm && isEditing ? (
        //   <textarea
        //     name={attribute}
        //     className={attribute + "_input"}
        //     onChange={onChange}
        //     value={changedValue}
        //   ></textarea>
        // ) : isForm && isCreatingNew ? (
        //   <textarea
        //     name={attribute}
        //     className={attribute + "_input"}
        //     onChange={onChange}
        //   ></textarea>
        // ) : 
        value?.url ? (
          <>
            <a href={value.url}>{value.url}</a>
            <br />
            <img src={value.url} alt="thumbnail_or_ss_image" />
          </>
        ) : (
          <p>{value}</p>
        )}
      </div>
    </div>
  );
};

export default ViewShowcase;
