import * as React from 'react';
import { Container } from '../../../styles/global';
import StaticContent from '../../helper/pages-helpers/StaticContent';
import { getShowcases } from '../../../services/other-services/showcases-services';

interface ShowCasesResponse {
    message?: string;
    error?: string;
    showcases: {
        data: [{
            attributes: {
                
            }
        }]
    }
}

const ShowCasesPage: React.FunctionComponent = (props) => {
    const [showcasesData, setShowcasesData] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(false);
    const [message, setMessage] = React.useState("");
    const getShowCasesData = React.useCallback(async () => {
        try {
            setIsLoading(true);
            const showcases = await getShowcases()
            console.log(showcases);

            if (showcases.status === 200) {
                console.log("status 200");
                setShowcasesData(showcases.data);
                setMessage(showcases.data.message|| showcases.data.error || "");

                console.log(showcasesData);

            } else {
                // setMessage(showcases.response.data.message)
            }
        } catch (err) {
            console.log(err);
        }
    }, []);

    React.useEffect(() => {
        getShowCasesData();
    }, [getShowCasesData]);

    return <Container>
        <StaticContent />
        <br />
        {showcasesData?.map((dat) => {
            return <p key={1}>{dat.title}</p>
        })}
    </Container>
};

export default ShowCasesPage;
