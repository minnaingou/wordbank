import React from "react";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EmailIcon from "@mui/icons-material/Email";

const About = () => {
  return (
    <Stack direction="column" spacing={2} alignItems="center" p={5} pb={10}>
      <img
        style={{ width: "60%", borderRadius: "30%" }}
        src={process.env.PUBLIC_URL + "/parrot-3.png"}
        alt="logo"
      />
      <Typography
        variant="h6"
        component="div"
        mt={3}
        style={{
          borderBottom: "1px solid black",
          lineHeight: "0.1em",
          margin: "40px 0 20px",
          width: "100%",
        }}
      >
        <span style={{ background: "white", padding: "0 10px" }}>
          About WordBank
        </span>
      </Typography>
      <div style={{ border: "1px solid black" }}>
        <Typography variant="body2" gutterBottom m={2}>
          Have you ever come across an unfamiliar word and looked it up in a
          dictionary, only to forget it a few moments later? WordBank is the app
          to help you with that. With WordBank, you can lookup a word and save
          it to your favourite list along with the example usages and your own
          notes. You can easily review them later in the Practice session where
          you will be presented with flashcards created from your favourites.
          WordBank helps you memorize new words by prioritizing the words you
          just added or the words you are having a hard time remembering before
          the words that are more frequently reviewed, and are remembered well.
        </Typography>
      </div>
      <Typography
        variant="h6"
        component="div"
        mt={3}
        style={{
          borderBottom: "1px solid black",
          lineHeight: "0.1em",
          margin: "40px 0 20px",
          width: "100%",
        }}
      >
        <span style={{ background: "white", padding: "0 10px" }}>About Me</span>
      </Typography>
      <div style={{ border: "1px solid black" }}>
        <Typography variant="body2" gutterBottom m={2}>
          I'm Min Naing Oo, a Backend Developer with a limited exposure to the
          modern frontend frameworks. I started exploring React recently and
          this app is the result of my effort to make use of what I've learned
          so far and to create an app I always wish existed.
        </Typography>
        <div style={{ textAlign: "left", paddingLeft: 20 }}>
          <Link
            href="https://www.linkedin.com/in/min-naing-oo-56b30284/"
            target="_blank"
            underline="hover"
          >
            <LinkedInIcon fontSize="small" /> Find me on LinkedIn
          </Link>
          <br />
          <Link
            href="mailto:minnaingoo@outlook.com"
            target="_blank"
            underline="hover"
            sx={{ verticalAlign: "middle" }}
          >
            <EmailIcon fontSize="small" /> Send me an email
          </Link>
        </div>
        <br />
        <br />
      </div>
      <Typography
        variant="h6"
        component="div"
        mt={3}
        style={{
          borderBottom: "1px solid black",
          lineHeight: "0.1em",
          margin: "40px 0 20px",
          width: "100%",
        }}
      >
        <span style={{ background: "white", padding: "0 10px" }}>
          Dependencies
        </span>
      </Typography>
      <div style={{ border: "1px solid black" }}>
        <Typography variant="body2" gutterBottom m={2}>
          React, react-redux, redux-thunk middleware, react-router, material-ui,
          react-card-flip, axios and Firebase for backend. Free Dictionary API @
          dictionaryapi.dev
        </Typography>
      </div>
      <Typography
        variant="h6"
        component="div"
        mt={3}
        style={{
          borderBottom: "1px solid black",
          lineHeight: "0.1em",
          margin: "40px 0 20px",
          width: "100%",
        }}
      >
        <span style={{ background: "white", padding: "0 10px" }}>Credits</span>
      </Typography>
      <div style={{ border: "1px solid black" }}>
        <Typography variant="body2" gutterBottom m={2}>
          Thanks my graphic designer friend{" "}
          <Link
            href="https://www.linkedin.com/in/wine-thinzar-b32507220/"
            target="_blank"
          >
            Wine Thin Zar Maung
          </Link>{" "}
          for the beautiful logo work.
        </Typography>
      </div>
    </Stack>
  );
};

export default About;
