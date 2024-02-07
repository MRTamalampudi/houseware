import {render, screen} from "@testing-library/react";
import '@testing-library/jest-dom'
import {Header} from "../todo/components/header";
import React from "react";

const mockDispacth = jest.fn();

function renderHeader() {
    render(<Header dispatch={mockDispacth}/>)
    const header = screen.queryByTestId("header")
    expect(header).toBeInTheDocument()
}

function isInputRendered() {
    render(<Header dispatch={mockDispacth}/>)
    const input = screen.queryByPlaceholderText("What needs to be done?")
    expect(input).toBeInTheDocument()
}

describe("Header",()=>{
    test("Render Header",renderHeader)
    test("Render Input",isInputRendered)
})