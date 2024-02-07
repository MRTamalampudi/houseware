import {render, screen} from "@testing-library/react";
import '@testing-library/jest-dom'
import {App} from "../todo/app";
import React from "react";


jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useLocation: () => ({
        pathname: "",
    }),
}));

describe("App initial Render",()=>{
    beforeEach(()=>{
        render(<App/>)
    })
    test("Header Render",()=>{
        const header = screen.queryByTestId("header");
        expect(header).toBeInTheDocument();
    })
    test("Main Render",()=>{
        const main = screen.queryByTestId("main");
        expect(main).toBeInTheDocument();
    })
    test("Footer Render",()=>{
        const footer = screen.queryByTestId("footer");
        expect(footer).not.toBeInTheDocument();
    })
})