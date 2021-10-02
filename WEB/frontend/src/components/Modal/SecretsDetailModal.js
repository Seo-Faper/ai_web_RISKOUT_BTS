import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Link from '@mui/material/Link';
import { getHighlightedText, getLineBreakText, getNodeText, replaceNewline } from '../../js/util';
import '../../css/SecretsDetailModal.css';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import AnalyzeIcon from '@mui/icons-material/Analytics';
import FavoriteIcon from '@mui/icons-material/Favorite';
import NavigationIcon from '@mui/icons-material/Link';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '50vw',
    maxHeight: '70vh',
    overflowY: 'auto',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};


export default function SecretsDetailModal(props) {
    const { isOpen, setOpen, data, scrapArticle, analyzePage } = props;
    const { isSaved, setSaved } = useState(false);
    const entityNames = Object.entries(data.entities).flatMap(x => x[1]);
    console.log(entityNames, getHighlightedText);

    const handleClose = () => {
        setOpen(false);
        // setSaved(false); // TODO how should we handle display of 'save' button?
    };

    return (
        <div>
            <Modal
                open={isOpen}
                onClose={handleClose}
                aria-labelledby="secrets-modal-title"
                aria-describedby="secrets-modal-description"
            >
                <Box sx={style}>
                    <Typography id="secrets-modal-title" variant="h6" component="h2">
                    <Link href={data.site_url} color="inherit" underline="hover" target="_blank" rel="noopener" title="원본 페이지 보기">
                        <NavigationIcon sx={{ mr: 1,  }} />
                    </Link>
                        {data.title}
                        <hr align="left" />
                    </Typography>

                    <Fab variant="extended" color="primary" size="small" aria-label="add to scrap" onClick={() => scrapArticle(data.id)}>
                        <AddIcon />
                        Save Article
                    </Fab>
                    <Fab variant="extended" size="small" aria-label="Detailed Analysis" onClick={() => analyzePage(data.id)}>
                        <AnalyzeIcon />
                        Analyze
                    </Fab>
                    <Fab variant="extended" size="small" onClick={()=>{window.open(data.site_url, '_blank').focus()}}>
                        <NavigationIcon sx={{ mr: 1 }} />
                        Source
                    </Fab>

                    
                    {/* <Link href="#" color="inherit" underline="hover">Page Analysis</Link>
                    <Button onClick={scrapArticle}>Save article</Button> */}

                    <Typography id="secrets-modal-description" sx={{ mt: 2 }} className="line-break">
                        {/* Insert highlighted version */}
                        {getHighlightedText(replaceNewline(data.contentBody, 2), entityNames.length ? entityNames[0] : "")}

                        {/* {data.summarized} */}

                        {/* <pre>
                        {JSON.stringify(data, null, 4)}
                        </pre> */}

                    </Typography>
                </Box>
            </Modal>
        </div>
    );
}
