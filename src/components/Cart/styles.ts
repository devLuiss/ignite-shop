import {styled} from "@/src/styles";
import * as Dialog from "@radix-ui/react-dialog";

export const CartContent = styled(Dialog.Content, {
  position: "fixed",
  top: "0",
  right: "0",
  bottom: "0",
  width: "30rem",
  backgroundColor: "$gray800",
  padding: "3rem",
  paddingTop: "4.5rem",
  boxShadow: "0 0 0 9999px rgba(0, 0, 0, 0.5)",
  display: "flex",
  flexDirection: "column",

  h2: {
    fontSize: "$lg",
    fontWeight: "bold",
    marginBottom: "2rem",
    color: "$gray100",
  },
  "> section": {
    display: "flex",
    flexDirection: "column",
    gap: "1.5rem",
    flex: 1,
    overflowY: "auto",
  },
});

export const CartClose = styled(Dialog.Close, {
  background: "none",
  cursor: "pointer",
  border: "none",
  position: "absolute",
  color: "$gray100",
  top: "1.75rem",
  right: "1.75rem",
  fontSize: "1.5rem",
  fontWeight: "bold",
  "&:hover": {
    color: "$green500",
  },
});

export const CartProducts = styled("div", {
  display: "flex",
  width: "100%",
  gap: "1rem",
  alignItems: "center",
  height: "5.8rem",
});

export const CartProductImage = styled("div", {
  width: "5.8rem",
  height: "5.8rem",
  background: " linear-gradient(180deg, #1EA483 0%, #7465D4 100%);",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "0.5rem",
  

  img: {
    objectFit: "cover",
  },
});

export const CartProductDetails = styled("div", {
  display: "flex",
  flexDirection: "column",
  height: "100%",

  p: {
    fontSize: "$md",
    color: "$gray300",
  },

  strong: {
    fontSize: "$md",
    marginTop: 4,
    fontWeight: "bold",
  },

  button: {
    marginTop: "auto",
    width: "max-content",
    background: "none",
    color: "$green500",
    fontSize: "1rem",
    fontWeight: "bold",
    border: "none",

    "&:hover": {
      color: "red",
      background: "none",
      border: "none",
    },
  },
});

export const CartFinalization = styled("div", {
  display: "flex",
  flexDirection: "column",
  marginTop: "auto",

  button: {
    width: "100%",
    background: "$green500",
    color: "white",
    fontSize: "$md",
    height: "3rem",
    borderRadius: "0.5rem",
    border: "none",
    fontWeight: "bold",

    "&:disabled": {
      opacity: 0.5,
      cursor: "not-allowed",
    },

    "&:not(:disabled):hover": {
      background: "$green300",
      color: "white",
    },
  },
});

export const FinalizationDetails = styled("section", {
  display: "flex",
  flexDirection: "column",
  gap: 8,
  marginBottom: 55,

  div: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",

    p: {
      fontSize: "$md",
      color: "$gray300",
    },

    "&:last-child": {
      fontweight: "bold",

      p: {
        fontSize: "$xl",
        color: "$gray100",
      },

      span: {
        fontSize: "$md",
      },
    },
  },
});
