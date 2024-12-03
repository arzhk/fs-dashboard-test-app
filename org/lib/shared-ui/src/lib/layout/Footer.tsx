import { Box, Container, Typography, Grid2 as Grid, Link, IconButton, Stack } from "@mui/material";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "background.alternate",
        py: 6,
        borderTop: "1px solid",
        borderColor: "divider",
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Company Name
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Building better solutions for a connected world.
            </Typography>
          </Grid>


          <Grid size={{ xs: 12, md: 4 }}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Quick Links
            </Typography>
            <Stack spacing={1}>
              <Link href="/about" color="text.secondary" underline="hover">
                About Us
              </Link>
              <Link href="/services" color="text.secondary" underline="hover">
                Services
              </Link>
              <Link href="/contact" color="text.secondary" underline="hover">
                Contact
              </Link>
            </Stack>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Connect With Us
            </Typography>
            <Stack direction="row" spacing={1}>
              <IconButton
                aria-label="Twitter"
                color="default"
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <TwitterIcon />
              </IconButton>
              <IconButton
                aria-label="LinkedIn"
                color="default"
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <LinkedInIcon />
              </IconButton>
              <IconButton
                aria-label="GitHub"
                color="default"
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <GitHubIcon />
              </IconButton>
            </Stack>
          </Grid>
        </Grid>

        {/* Copyright */}
        <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 4 }}>
          © {currentYear} Company Name. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
