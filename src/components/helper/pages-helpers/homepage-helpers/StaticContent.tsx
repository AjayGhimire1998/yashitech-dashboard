import * as React from 'react';
import { Logo } from '../../../../styles/global';
import { Pagination, PaginationWrapper } from '../../../pages/pages-styles';

interface Props {
    history?: string
}

const StaticContent: React.FC<Props> = ({history}) => {
    return <>
        <Logo goToHome={"/"}/>
        <PaginationWrapper>
            <Pagination href={`/${history}`}> {"<- Back"}</Pagination>
        </PaginationWrapper>
    </>

};

export default StaticContent;
