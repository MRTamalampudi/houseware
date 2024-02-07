import React from "react";
import '@testing-library/jest-dom'
import {fireEvent, render, screen} from "@testing-library/react";
import {Footer} from "../todo/components/footer";
import {activeTodos, todos} from "../tests/data";
import * as reactRouterDOM from "react-router-dom";


const FOOTER_TEST_ID = "footer"
const FILTER_TEST_ID = "footer-navigation"
const CLEAR_COMPLETED = "Clear completed"

const mockDispatch = jest.fn();

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useLocation: jest.fn().mockReturnValue({pathname: ""})
}));

function renderFooterBeforeEach(){
    return render(<Footer todos={todos} dispatch={mockDispatch}/>)
}

function getCountText() {
    const activeCountCheck = todos.filter(todo=>!todo.completed);
    const countText = activeCountCheck !== 1 ? `${activeCountCheck.length} items left!` : `${activeCountCheck.length} item left!`
    return countText;
}

function renderTodoCountCheck() {
    renderFooterBeforeEach();
   const countText = getCountText()
   const conutItem = screen.getByText(countText)
   expect(conutItem).not.toBeNull();
}

function renderClearCompleted() {
    renderFooterBeforeEach()
    const clearButton = screen.queryByText(CLEAR_COMPLETED)
    expect(clearButton).not.toBeNull();
    expect(clearButton).toBeInTheDocument();
}

function renderFooterNavigation() {
    renderFooterBeforeEach()
    const footerNavigation = screen.queryByTestId(FILTER_TEST_ID)
    expect(footerNavigation).not.toBeNull()
    const allFilter = screen.queryByText("All")
    expect(allFilter).not.toBeNull();
    const activeFilter = screen.queryByText("Active")
    expect(activeFilter).not.toBeNull();
    const completedFilter = screen.queryByText("Completed")
    expect(completedFilter).not.toBeNull();
}

function renderFooterOnNullTodos() {
    jest.spyOn(reactRouterDOM,"useLocation").mockReturnValue({pathname:""})
    const result = render(<Footer todos={null} dispatch={mockDispatch()} />)
    expect(result).toBeNull()
}

function renderFooteronEMptyArray() {
    jest.spyOn(reactRouterDOM,"useLocation").mockReturnValue({pathname:""})
    render(<Footer todos={[]} dispatch={mockDispatch()} />)
    const footer = screen.queryByTestId(FOOTER_TEST_ID)
    expect(footer).toBeNull()
}

describe("footer render",()=>{
    test("render items left count check",renderTodoCountCheck)
    test("check clear completed render",renderClearCompleted)
    test("check is footer navigation render",renderFooterNavigation)
    test("check on null todos",renderFooterOnNullTodos) // will fail
    test("check on emptyTodo array",renderFooteronEMptyArray)
})

function checkCount() {
    const countText = getCountText();
    const result = renderFooterBeforeEach();
    const renderedCount = result.container.children.item(0).querySelector(".todo-count").textContent;
    expect(countText).toBe(renderedCount);
}

function checkAllFiltersOnNavigation() {
    jest.spyOn(reactRouterDOM,"useLocation").mockReturnValue({pathname:""})
    checkCount();
    jest.spyOn(reactRouterDOM,"useLocation").mockReturnValue({pathname:"/active"})
    checkCount();
    jest.spyOn(reactRouterDOM,"useLocation").mockReturnValue({pathname:"/completed"})
}

function checkClearCompletedButton() {
    jest.spyOn(reactRouterDOM,"useLocation").mockReturnValue({pathname:""})
    render(<Footer todos={todos} dispatch={mockDispatch} />);
    const clearCompletedButton = screen.getByText('Clear completed');
    fireEvent.click(clearCompletedButton);
    expect(mockDispatch).toHaveBeenCalledWith({ type: 'REMOVE_COMPLETED_ITEMS' });
}

function isClearButtonDisabled() {
    jest.spyOn(reactRouterDOM,"useLocation").mockReturnValue({pathname:""})
    render(<Footer todos={activeTodos} dispatch={mockDispatch} />)
    const clearCompletedButton = screen.getByText('Clear completed');
    expect(clearCompletedButton).toBeDisabled()
}

function isClearButtonActiveOnAllItems() {
    jest.spyOn(reactRouterDOM,"useLocation").mockReturnValue({pathname:""})
    render(<Footer todos={todos} dispatch={mockDispatch} />)
    const clearCompletedButton = screen.getByText('Clear completed');
    expect(clearCompletedButton).not.toBeDisabled()
}

describe("Check Footer Functionality",()=>{
    test("Check items left count on ALl filters",checkAllFiltersOnNavigation)
    test("Check Clear button dispatches correct action",checkClearCompletedButton)
    test("Check clear completed disable on all active todos",isClearButtonDisabled)
    test("Check clear completed active on mixed items",isClearButtonActiveOnAllItems)
})