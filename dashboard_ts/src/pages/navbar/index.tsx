import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Box, Typography, useTheme } from "@mui/material";
import Input from "@mui/material/Input";
import TextField from "@mui/material/TextField";
import FlexBetween from "../../components/FlexBetween";
import PixIcon from "@mui/icons-material/Pix";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";

type Props = {};

const Navbar = (props: Props) => {
  const [postcode, setPostcode] = useState("");
  const navigate = useNavigate();
  const submitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    var url = postcode.replace(" ", "").replace("-", "");
    navigate(`/postcode/${url}`);
  };
  const { palette } = useTheme();
  const [selected, setSelected] = useState("dashboard");
  return (
    <FlexBetween mb="0.25rem" p="0.5rem 0rem" color={palette.grey[300]}>
      {/* LEFT SIDE */}
      <FlexBetween gap="0.75rem">
        <PixIcon sx={{ color: palette.primary[900] }} />
        <Typography variant="h4" fontSize="16px">
          {" "}
          PropIntel{" "}
        </Typography>
      </FlexBetween>

      {/** MIDDLE */}
      <FlexBetween>
        <form onSubmit={submitForm}>
          <Input
            value={postcode}
            onChange={(e) => setPostcode(e.target.value)}
            type="text"
            placeholder="Postcode..."
            className="input"
            startAdornment={
              <IconButton type="submit" aria-label="send">
                <SearchIcon />
              </IconButton>
            }
            sx={{ color: palette.grey[100], bgcolor: palette.grey[600] }}
          />
        </form>
      </FlexBetween>

      {/* RIGHT SIDE */}
      <FlexBetween gap="2rem">
        <Box sx={{ "&:hover": { color: palette.primary[100] } }}>
          <Link
            to="/"
            onClick={() => setSelected("dashboard")}
            style={{
              color: selected === "dashboard" ? "inherit" : palette.grey[700],
              textDecoration: "inherit",
            }}
          >
            Dashboard
          </Link>
        </Box>
        <Box sx={{ "&:hover": { color: palette.primary[100] } }}>
          <Link
            to="/returnoninvestment"
            onClick={() => setSelected("returnoninvestment")}
            style={{
              color:
                selected === "returnoninvestment"
                  ? "inherit"
                  : palette.grey[700],
              textDecoration: "inherit",
            }}
          >
            Return On Investment
          </Link>
        </Box>
      </FlexBetween>
    </FlexBetween>
  );
};

export default Navbar;
