import React from "react";
import '@testing-library/jest-dom'
import {fireEvent, render, screen} from "@testing-library/react";
import {Item} from "../todo/components/item";

const todo = {
    id:37,
    title:"Meet dhoni",
    completed:false
}

const mockDispatch = jest.fn();

const LABEL_TEST_ID = "todo-item-label"
const INPUT_TEST_ID = "todo-item-toggle"

function renderItemBeforeEach(){
    render(<Item todo={todo} dispatch={mockDispatch}/>)
}

function renderItemComponent() {
    const label = screen.queryByTestId(LABEL_TEST_ID)
    expect(label.textContent).toBe(todo.title)
}

function renderInputTagCheck(){
    const input = screen.queryByTestId(INPUT_TEST_ID);
    expect(input).not.toBeNull()
}


function renderLabelTagCheck() {
    const label = screen.queryByTestId(LABEL_TEST_ID)
    expect(label).not.toBeNull()
}

describe("Render item",()=>{
    beforeEach(renderItemBeforeEach)
    test("render item component check",renderItemComponent)
    test("render input tag check",renderInputTagCheck)
    test("render label tage check",renderLabelTagCheck)
})