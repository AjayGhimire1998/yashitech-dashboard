import * as React from 'react';
import { Logo } from '../../../styles/global';
import { Pagination, PaginationWrapper } from '../../pages/styles';

// interface Props {
// }

const StaticContent: React.FC = () => {
    return <>
        <Logo />
        <PaginationWrapper>
            <Pagination href="/"> {"<- Back"}</Pagination>
        </PaginationWrapper>
    </>

};

export default StaticContent;
