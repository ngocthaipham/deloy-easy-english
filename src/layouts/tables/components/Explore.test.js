import React from "react";
import { render, screen } from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import "@testing-library/jest-dom";
import { ThemeProvider, StyledEngineProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Explore from "./Explore.js";
import theme from "assets/theme";

const server = setupServer(
  rest.get("/server-easyenglish.herokuapp.com/sources/0/page1", (req, res, ctx) => {
    return res(
      ctx.json({
        result: [
          {
            idSource: 16,
            nameSource: "Vocabulary for IELTS",
            desSource: "Some vocabulary you can learn for IELTS",
            imageSource: "imageSource1627389081030.jpg",
            userName: "marbiosgod",
            private: 0,
            likes: 4,
            star: 0,
            countRating: 0,
            comments: 0,
          },
        ],
      })
    );
  }),
);
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("renders", () => {
  render(
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Explore />
      </ThemeProvider>
    </StyledEngineProvider>
  )
  expect(screen.getByText(/explore/i)).toBeInDocument()
});
