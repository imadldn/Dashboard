import { Box, useTheme } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import Row1 from "./Row1";
import Row2 from "./Row2";
import Row3 from "./Row3";
import { useParams } from "react-router-dom";
import { useGetAreaCodeQuery } from "../../data/nomisApi";

type PostCode = { postcode: string };

const gridTemplateLargeScreens = `
"a b c"
"a b c"
"a b c"
"a b f"
"d e f"
"d e f"
"d h i"
"g h i"
"g h j"
"g h j"
`;

const gridTemplateSmallScreen = `
    "a"
    "a"
    "a"
    "a"
    "b"
    "b"
    "b"
    "c"
    "c"
    "c"
    "d"
    "d"
    "d"
    "e"
    "e"
    "f"
    "f"
    "f"
    "g"
    "g"
    "g"
    "h"
    "h"
    "h"
    "i"
    "i"
    "j"
    "j"
`;

const Dashboard = () => {
  const { postcode }: PostCode = useParams() as PostCode;
  let inner = postcode?.substr(postcode?.length - 3, 3);
  let outer = postcode?.substr(0, postcode?.length - 3);
  const formattedPC = outer + inner;
  const { data, isSuccess, isLoading, isError, error } = useGetAreaCodeQuery({
    postcode: formattedPC,
  });
  if (isSuccess) {
    console.log("Area Code Result: ", data);
  } else if (isLoading) {
    console.log("IS LOADING");
  } else if (isError) {
    console.log("ERROR: ", error);
  }
  const isAboveMediumScreens = useMediaQuery("(min-width:1200px)");
  return (
    <Box
      width="100%"
      height="100%"
      display="grid"
      gap="1.5rem"
      sx={
        isAboveMediumScreens
          ? {
              gridTemplateColumns: "repeat(3, minmax(370px,1fr))", //meaning that each column has min 370px
              gridTemplateRows: "repeat(10, minmax(60px, 1fr))",
              gridTemplateAreas: gridTemplateLargeScreens,
            }
          : {
              gridAutoColumns: "1fr",
              gridAutoRows: "80px",
              gridTemplateAreas: gridTemplateSmallScreen,
            }
      }
    >
      <Row1 />
      <Row2 />
      <Row3 />
    </Box>
  );
};

export default Dashboard;
