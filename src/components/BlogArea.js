import { Box } from "@mui/material";
import React, { useState } from 'react';
import CustomButton from "../shared/Custom-Button";
import Texfield from '../shared/Custom-TextField';
import { generateBlog } from '../services/api';

const BLogArea = ({ onBlogGenerated }) => {
    const [topic, setTopic] = useState('');
    const [mainPoints, setMainPoints] = useState('');
    const [audience, setAudience] = useState('');
    const [goal, setGoal] = useState('');
    const [lengthAndTone, setLengthAndTone] = useState('');
    const [keywords, setKeywords] = useState('');
    const [loading, setLoading] = useState(false);

    const handleGenerate = async () => {
        setLoading(true);
        try {
            const data = {
                topic,
                mainPoints,
                audience,
                goal,
                lengthAndTone,
                keywords
            };
            const response = await generateBlog(data);
            if (onBlogGenerated) {
                onBlogGenerated(response.blog);
            }
        } catch (err) {
            alert('Failed to generate blog: ' + (err.response?.data?.error || err.message));
        }
        setLoading(false);
    };

    return (
        <Box
            sx={{
                bgcolor: '#ffffff',
                width: { xs: '100%', sm: '100%', md: '420px', lg: '558px' },
                height: { xs: 'auto', sm: 'auto', md: '550px', lg: '550px' },
                display: 'flex',
                flexDirection: 'column',
                borderRadius: "25px",
                boxShadow: '4px 2px 5px rgba(0, 0, 0, 0.1)',
                marginLeft:{xs:'0px', sm:'0px', md:'10px', lg:'-20px'} ,
                padding: { xs: '2px', sm: '5px', md: '10px', lg: '20px' ,xl:'30px'},
                overflow: { xs: 'visible', sm: 'visible', md: 'hidden', lg: 'hidden' },
            }}
        >
            <Box
                sx={{
                    width: '100%',
                    // padding: 4,
                    paddingTop: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: '25px!important',
                    gap: 2,
                    justifyContent: 'flex-start',
                    overflowY: { xs: 'visible', sm: 'visible', md: 'auto', lg: 'auto' },
                    maxHeight: { xs: 'none', sm: 'none', md: '90vh', lg: '90vh' },
                    overflowX: 'hidden',
                }}
            >
                <Texfield
                    multiline
                    rows={3}
                    textcontent="What is the blog about?"
                    type="text"
                    value={topic}
                    onChange={e => setTopic(e.target.value)}
                    placeHolder='e.g., "How AI is Transforming Small Businesses" or just "AI in Business"'
                    sx={{
                        '& .MuiInputBase-input::placeholder': {
                            fontSize: '14px',
                            width: "80%",
                            padding: '10px',
                            lineHeight: '0.5'
                        },
                    }}
                />
                <Texfield
                    multiline
                    rows={3}
                    textcontent="What are the main ideas or points you want included?"
                    type="text"
                    value={mainPoints}
                    onChange={e => setMainPoints(e.target.value)}
                    placeHolder="e.g., “AI benefits, challenges, and case studies”"
                    sx={{
                        '& .MuiInputBase-input::placeholder': {
                            fontSize: '14px',
                            width: "80%",
                            padding: '10px'
                        },
                    }}
                />
                <Texfield
                    multiline
                    rows={3}
                    textcontent="Who is this blog for?"
                    type="text"
                    value={audience}
                    onChange={e => setAudience(e.target.value)}
                    placeHolder="e.g., “Small business owners, entrepreneurs, general readers”"
                    sx={{
                        '& .MuiInputBase-input::placeholder': {
                            fontSize: '14px',
                            width: "80%",
                            padding: '10px'
                        },
                    }}
                />
                <Texfield
                    multiline
                    rows={3}
                    textcontent="What's the goal of the blog?"
                    type="text"
                    value={goal}
                    onChange={e => setGoal(e.target.value)}
                    placeHolder="e.g., “Educate readers, promote a service, boost website traffic”"
                    sx={{
                        '& .MuiInputBase-input::placeholder': {
                            fontSize: '14px',
                            width: "80%",
                            padding: '10px'
                        },
                    }}
                />
                <Texfield
                    multiline
                    rows={3}
                    textcontent="How long should the blog be, and what tone should it have?"
                    type="text"
                    value={lengthAndTone}
                    onChange={e => setLengthAndTone(e.target.value)}
                    placeHolder="e.g., “800 words, professional and engaging”"
                    sx={{
                        '& .MuiInputBase-input::placeholder': {
                            fontSize: '14px',
                            width: "80%",
                            padding: '10px'
                        },
                    }}
                />
                <Texfield
                    multiline
                    rows={3}
                    textcontent="What keywords or phrases should the blog focus on?"
                    type="text"
                    value={keywords}
                    onChange={e => setKeywords(e.target.value)}
                    placeHolder="e.g., “AI trends, small business automation”"
                    sx={{
                        '& .MuiInputBase-input::placeholder': {
                            fontSize: '14px',
                            width: "80%",
                            padding: '10px'
                        },
                    }}
                />
            </Box>

            <Box
                sx={{
                    width: '100%',
                    borderRadius: '0px 0px 25px 25px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingBottom: 0,
                    marginBottom: 0,
                }}
            >
                <CustomButton
                    text={loading ? "Generating..." : "Generate Blog"}
                    onClick={handleGenerate}
                    // disabled={loading}
                    sx={{
                        width: '100%',
                        borderRadius: '0px 0px 25px 25px',
                        color: 'white',
                        fontFamily: 'Urbanist, sans-serif',
                        fontSize: '20px',
                        marginBottom: 0,
                        paddingBottom: 0,
                        fontWeight: 600
                    }}
                />
            </Box>
        </Box>
    );
};

export default BLogArea;
