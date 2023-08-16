import * as React from 'react';
import { ShowcaseColumn } from '../../../pages/showcases-page/styles';

interface IColumnWrapperProps {
    children?: React.ReactNode;
    className?: string;
}

const ColumnWrapper: React.FunctionComponent<IColumnWrapperProps> = ({ children, className }) => {
    return <div className={className}>
        <ShowcaseColumn value1='Id' value2='Tittle' value3='Client' value4='Year' />
        {children}
    </div>
};

export default ColumnWrapper;
