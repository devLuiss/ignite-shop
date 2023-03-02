import {styled} from "@/src/styles";

export const CartButtonContainer = styled("button", {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "3rem",
  height: "3rem",
  borderRadius: 6,
  border: "none",
  position: "relative",
  backgroundColor: "$gray800",
  
  color: "$gray500",
  cursor: "pointer",
  transition: "all 0.2s ease-in-out",

  svg: {
    fontSize: 24,
  },

  "&:disabled":{
    opacity: 0.6,
    cursor: "not-allowed",
  },

  "&:hover": {
    backgroundColor: "$gray900",
  },
  "&:focus": {
    outline: "none",
  },
});
