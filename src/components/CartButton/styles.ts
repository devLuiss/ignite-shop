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

  "&:disabled": {
    opacity: 0.6,
    cursor: "not-allowed",
  },

  "&:hover": {
    backgroundColor: "$gray900",
  },
  "&:focus": {
    outline: "none",
  },

  variants: {
    color: {
      green: {
        backgroundColor: "$green500",
        color: "white",
        "&:hover": {backgroundColor: "$green300"},
      },
      gray: {
        backgroundColor: "$gray800",
        color: "$gray500",
      },

      defaultVariants: {
        color: "gray",
      },
    },

    size: {
      small: {
        width: "2rem",
        height: "2rem",
        svg: {
          fontSize: 16,
          transform: "scale(0.8)",
          transition: "all 0.2s ease-in-out",
          "&:hover": {
            transform: "scale(1)",
          },
        },
      },
      medium: {
        width: "3rem",
        height: "3rem",
        svg: {
          fontSize: 24,
          transform: "scale(1)",
          transition: "all 0.2s ease-in-out",
          "&:hover": {
            transform: "scale(1.2)",
          },
        },
      },

      large: {
        width: "4rem",
        height: "4rem",
        svg: {
          fontSize: 32,
          transform: "scale(1.2)",
          transition: "all 0.2s ease-in-out",
          "&:hover": {
            transform: "scale(1.4)",
          },
        },
      },
      defaultVariants: {
        size: "medium",
      },
    },
  },
});