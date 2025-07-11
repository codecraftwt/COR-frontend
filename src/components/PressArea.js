import { Box } from "@mui/material";
import React, { useState } from 'react';
import CustomButton from "../shared/Custom-Button";
import Texfield from '../shared/Custom-TextField';
import CustomChips from "../shared/Custom-Chips";
import { generatePressRelease } from "../services/api";

const formatPressRelease = (text) => {
  return text
    .split(/\n{2,}/)
    .map(p => `<p>${p.replace(/\n/g, "<br/>")}</p>`)
    .join("");
};

const PressArea = ({ onPressReleaseGenerated }) => {
  const [type, setType] = useState('');
  const [tags, setTags] = useState([]);
  const [reason, setReason] = useState('');
  const [facts, setFacts] = useState('');
  const [company, setCompany] = useState('');
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [image, setImage] = useState('');

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const data = {
        type,
        spokespersons: tags,
        reason,
        facts,
        company
      };
      const response = await generatePressRelease(data);
      if (onPressReleaseGenerated) {
        onPressReleaseGenerated({
          title: type,
          author: tags.join(', '),
          intro: reason,
          body: formatPressRelease(response.pressRelease),
          facts,
          company,
          date,
          location,
          image
        });
      }
    } catch (err) {
      alert("Failed to generate press release: " + (err.response?.data?.error || err.message));
    }
    setLoading(false);
  };

  return (
    <Box
      sx={{
        bgcolor: '#ffffffff',
        width: { xs: '100%', sm: '100%', md: '420px', lg: '530px' },
        height: { xs: 'auto', sm: 'auto', md: 'auto', lg: '550px' },
        marginLeft: { xs: '0px', sm: '0px', md: '10px', lg: '40px' },
        display: 'flex',
        flexDirection: 'column',
        borderRadius: "25px",
        boxShadow: '4px 2px 5px rgba(0, 0, 0, 0.1)',
        margin: '0px',
        padding: { xs: '2px', sm: '5px', md: '10px', lg: '20px', xl: '30px' },
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          width: '100%',
          padding: 0,
          paddingTop: 1,
          display: 'flex',
          flexDirection: 'column',
          borderRadius: '25px 25px 0px 0px ',
          gap: 0.5,
          justifyContent: 'flex-start',
          overflowY: 'auto',
          maxHeight: '90vh',
          overflowX: 'hidden',
          marginLeft: { xs: '0px', sm: '0px', md: '0px', lg: '0px' },
        }}
      >
        <Texfield
          multiline
          rows={4}
          textcontent="What type of press release are you writing?"
          type="text"
          value={type}
          onChange={e => setType(e.target.value)}
          placeHolder="e.g., product announcement, event, collaboration, results, etc."
          sx={{
            '& .MuiInputBase-input::placeholder': {
              fontSize: '14px',
              width: "80%",
              padding: '10px'
            },
          }}
        />

        <CustomChips
          label="Who is the spokesperson(s) in the release?"
          initialChips={tags}
          onChange={setTags}
          sx={{ mt: 2 , width:{ sm:"100%" , md:"100%", lg:"100%" , xl:"100%" } }}
        />

        <Texfield
          multiline
          rows={4}
          textcontent="Tell us more about why are you writing this release?"
          type="text"
          value={reason}
          onChange={e => setReason(e.target.value)}
          placeHolder="Summarize in a few sentences or a paragraph."
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
          rows={4}
          textcontent="Add any facts, notes, & quotes in the release"
          type="text"
          value={facts}
          onChange={e => setFacts(e.target.value)}
          placeHolder="Other details"
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
          rows={4}
          textcontent=" Add about your company description"
          type="text"
          value={company}
          onChange={e => setCompany(e.target.value)}
          placeHolder="Other details"
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
          text={loading ? "Generating..." : "Generate Press Release"}
          onClick={handleGenerate}
          // disabled={loading}
          sx={{
            width: '100%',
            borderRadius: '0px 0px 25px 25px',
            color: 'white',
            fontFamily: 'Urbanist, sans-serif',
            fontSize: { xs: '16px', sm: '20px' }, 
            fontWeight: 600,
            marginBottom: 0,
            paddingBottom: 0,
          }}
        />
      </Box>
    </Box>
  );
};

export default PressArea;
