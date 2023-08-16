import * as React from 'react';
import { Container, LoadingSpinner, Message } from '../../../styles/global';
import StaticContent from '../../helper/pages-helpers/homepage-helpers/StaticContent';
import { getShowcases } from '../../../services/other-services/showcases-services';

interface ShowCasesResponse {
    message?: string;
    error?: string;
    showcases: {
        data: [EachShowCase]
    }
}

interface EachShowCase {
    id: string;
    type: string;
    attributes: {};
}

const ShowCasesPage: React.FunctionComponent = (props) => {
    const [showcasesData, setShowcasesData] = React.useState<ShowCasesResponse>();
    const [isLoading, setIsLoading] = React.useState<boolean>();
    const [message, setMessage] = React.useState<string>();
    const getShowCasesData = React.useCallback(async () => {
        try {
            setIsLoading(true);
            const showcases = await getShowcases()
            setShowcasesData(showcases.data);
        } catch (err) {
            setIsLoading(false);
            setMessage("Something went wrong. Try Reloading.")
            console.log(err);
        }
    }, []);

    React.useEffect(() => {
        getShowCasesData();
    }, [getShowCasesData]);

    React.useEffect(() => {
        if (showcasesData) {
            setMessage(showcasesData.message || showcasesData.error);
            setIsLoading(false);
        }

        const loaderInterval = setInterval(() => {
            if (!showcasesData) {
                setIsLoading(false)
            }
        }, 5000)

        return () => clearInterval(loaderInterval);

    }, [showcasesData]);

    return <Container>
        <StaticContent history="" />
        <br />
        <h2>ShowCases Data</h2>
        <br />
        <br />
        {isLoading ? (
            <LoadingSpinner color="#440a70" height='50px' width="50px" />
        ) : showcasesData ? (
            <>
                {message ? (
                    <Message
                        bgColor="#440a70"
                        txtColor="white"
                        onClick={() => setMessage("")}
                    >
                        {message}
                    </Message>
                ) : null}
                <br />
                <br />
                {showcasesData.showcases.data.map((show: any) => (
                    <a key={show.id} href={`/showcases/${show.id}`}>{show.attributes.title}</a>
                    // <DataValue key={show.id}>{show.attributes.title}</DataValue>
                ))}
            </>

        ) : <p>Internal Server Error. Try Reloading.</p>}

    </Container>
};

export default ShowCasesPage;
