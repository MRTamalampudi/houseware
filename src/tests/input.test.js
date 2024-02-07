import React from "react";
import {fireEvent, render, screen} from "@testing-library/react";
import '@testing-library/jest-dom'
import {Input} from "../todo/components/input";

const mockOnSubmit = jest.fn();
const mockOnBlur = jest.fn();
const PLACE_HOLDER ="What needs to be done?";

function inputRender(){
    const renderr = render(<Input onSubmit={mockOnSubmit} placeholder={PLACE_HOLDER} label={"input"} defaultValue={undefined} onBlur={mockOnBlur}/>)
    const className = renderr.container.firstElementChild?.classList["0"]
    expect(className).toBe("input-container")
}

function checkInputValueOnType() {
    const DEMO_VALUE = "hello msdian"
    const input = screen.queryByPlaceholderText(PLACE_HOLDER)
    fireEvent.change(input,{target:{value:DEMO_VALUE}})
    expect(input?.value).toBe(DEMO_VALUE)
}

function clearValueOnEnter() {
    const DEMO_VALUE = "hello msdian"
    const input = screen.queryByPlaceholderText(PLACE_HOLDER);
    fireEvent.change(input,{target:{value:DEMO_VALUE}});
    fireEvent.keyDown(input,{key:"Enter",code:"Enter"})
    expect(input?.value).toBe("")
}

function renderBeforeEach(){
    render(<Input onSubmit={mockOnSubmit} placeholder={PLACE_HOLDER} label={"input"} defaultValue={undefined} onBlur={mockOnBlur}/>)
}


describe("Input",()=>{
    test("Input Render",inputRender)
    beforeEach(renderBeforeEach)
    test("check input value on type",checkInputValueOnType)
    test("clear on enter keydown",clearValueOnEnter)
})