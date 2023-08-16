import * as React from 'react';
import { Container, LoadingSpinner, Message } from '../../../styles/global';
import StaticContent from '../../helper/pages-helpers/StaticContent';
import { getShowcases } from '../../../services/other-services/showcases-services';
import { DataValue } from '../styles';


interface ShowCasesResponse {
    message?: string;
    error?: string;
    fullErrors?: [];
    showcases: {
        data: [{
            attributes: {},
            id: string,
            type: string
        }]
    }
}

interface EachShowCase {
    id: string;
    type: string;
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
    }, []);

    React.useEffect(() => {
        if (showcasesData) {
            setMessage(showcasesData.message || showcasesData.error);
            setIsLoading(false);
        }

        setInterval(() => {
            setMessage("");
        }, 3000);

        setInterval(() => {
            if (!showcasesData) {
                setIsLoading(false)
            }
        }, 5000)
    }, [showcasesData]);

    return <Container>
        <StaticContent />
        <br />
        <h2>ShowCase Data</h2>
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
                {showcasesData.showcases.data.map((show: ) => (
                    // <a key={show.id} href=''>{show.attributes.title}</a>
                    <DataValue key={show.id}>{show.attributes.title}</DataValue>
                ))}
            </>

        ) : <p>Internal Server Error. Try Reloading</p>}

    </Container>
};

export default ShowCasesPage;
