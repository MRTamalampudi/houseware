import React from "react";
import '@testing-library/jest-dom'
import {fireEvent, queryByTestId, render, screen} from "@testing-library/react";
import {Main} from "../todo/components/main";
import {activeTodos, completedTodos, todos} from "../tests/data";
import * as reactRouterDOM from "react-router-dom";
import {REMOVE_ITEM, TOGGLE_ALL, TOGGLE_ITEM, UPDATE_ITEM} from "todo/constants";

const MAIN_TEST_ID = "main"
const TOOGLE_ALL_TEST_ID = "toggle-all"
const TODO_LIST_TEST_ID = "todo-list"
const REMOVE_TODO_ITEM_BUTTON_TEST_ID = "todo-item-button"
const TODO_ITEM_LABEL = "todo-item-label";

const mockDispatch = jest.fn()

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useLocation: jest.fn().mockReturnValue({pathname: ""})
}));

function renderBeforeEach() {
    return render(<Main todos={todos} dispatch={mockDispatch}/>)
}

function renderMainFUction() {
    jest.spyOn(reactRouterDOM,"useLocation").mockReturnValue({
        pathname:""
    })
    renderBeforeEach()
    const main = screen.queryByTestId(MAIN_TEST_ID)
    expect(main).not.toBeNull();
    const todoList = screen.queryByTestId(TODO_LIST_TEST_ID)
    expect(todoList.children.length).toBe(todos.length)

}


function renderActiveItems() {
    jest.spyOn(reactRouterDOM,"useLocation").mockReturnValue({
        pathname:"/active"
    })
    renderBeforeEach()
    const activeItem = screen.queryByText("Meet dhoni")
    expect(activeItem).not.toBeNull();
    const completedItem = screen.queryByText("Go to the gym")
    expect(completedItem).toBeNull();
    const todoList = screen.queryByTestId(TODO_LIST_TEST_ID)
    expect(todoList.children.length).toBe(activeTodos.length)
}

function renderCompleted() {
    jest.spyOn(reactRouterDOM,"useLocation").mockReturnValue({
        pathname:"/completed"
    })
    renderBeforeEach()
    const activeItem = screen.queryByText("Meet dhoni")
    expect(activeItem).toBeNull();
    const completedItem = screen.queryByText("Go to the gym")
    expect(completedItem).not.toBeNull();
    const todoList = screen.queryByTestId(TODO_LIST_TEST_ID)
    expect(todoList.children.length).toBe(completedTodos.length)
}

function renderAllTodos() {
    jest.spyOn(reactRouterDOM,"useLocation").mockReturnValue({
        pathname:""
    })
    renderBeforeEach()
    const activeItem = screen.queryByText("Meet dhoni")
    expect(activeItem).not.toBeNull();
    const completedItem = screen.queryByText("Go to the gym")
    expect(completedItem).not.toBeNull();
}

describe("Main Component Render",()=>{
    test("render all todos without any filter",renderMainFUction)
    test("render active todos",renderActiveItems)
    test("render completed todos",renderCompleted)
    test("render all todos",renderAllTodos)
})

function checkToogleFunctionalityWithMixedTodos() {
    jest.spyOn(reactRouterDOM,"useLocation").mockReturnValue({
        pathname:""
    })
    render(<Main todos={todos} dispatch={mockDispatch}/>)
    fireEvent.click(screen.queryByTestId(TOOGLE_ALL_TEST_ID))
    expect(mockDispatch).toHaveBeenCalledWith({ type: TOGGLE_ALL, payload: { completed: true } })
}

function checkToogleFunctionalityWithActiveTodos() {
    jest.spyOn(reactRouterDOM,"useLocation").mockReturnValue({
        pathname:""
    })
    render(<Main todos={activeTodos} dispatch={mockDispatch}/>)
    fireEvent.click(screen.queryByTestId(TOOGLE_ALL_TEST_ID))
    expect(mockDispatch).toHaveBeenCalledWith({ type: TOGGLE_ALL, payload: { completed: true } })
}

function checkToogleFunctionalityWithCompletedTodos() {
    jest.spyOn(reactRouterDOM,"useLocation").mockReturnValue({
        pathname:""
    })
    render(<Main todos={completedTodos} dispatch={mockDispatch}/>)
    fireEvent.click(screen.queryByTestId(TOOGLE_ALL_TEST_ID))
    expect(mockDispatch).toHaveBeenCalledWith({ type: TOGGLE_ALL, payload: { completed: false } })
}

function checkRemoveTodoItemfunctionality() {
    jest.spyOn(reactRouterDOM,"useLocation").mockReturnValue({
        pathname:""
    })
    render(<Main todos={todos} dispatch={mockDispatch}/>)
    const todoList = screen.queryByTestId(TODO_LIST_TEST_ID)
    todos.forEach((todo,index) =>{
        const item = todoList.children.item(index)
        fireEvent.mouseEnter(item)
        const removeButton = item.querySelector(".destroy")
        fireEvent.click(removeButton)
        expect(mockDispatch).toHaveBeenCalledWith({ type: REMOVE_ITEM, payload: { id:todos[index].id } })
    })
}

function checkItemtoogleButtonFunctionality() {
    jest.spyOn(reactRouterDOM,"useLocation").mockReturnValue({
        pathname:""
    })
    render(<Main todos={todos} dispatch={mockDispatch}/>)
    const todoList = screen.queryByTestId(TODO_LIST_TEST_ID)
    todos.forEach((todo,index) =>{
        const item = todoList.children.item(index)
        fireEvent.mouseEnter(item)
        const toogleButton = item.querySelector(".toggle")
        fireEvent.click(toogleButton)
        expect(mockDispatch).toHaveBeenCalledWith({ type: TOGGLE_ITEM, payload: { id:todos[index].id } })
    })
}

function checkDoubleClickFunctionality() {
    jest.spyOn(reactRouterDOM,"useLocation").mockReturnValue({
        pathname:""
    })
    render(<Main todos={todos} dispatch={mockDispatch}/>)
    const todoList = screen.queryByTestId(TODO_LIST_TEST_ID)
    todos.forEach((todo,index) =>{
        const item = todoList.children.item(index)
        fireEvent.mouseEnter(item)
        const itemLabel = item.querySelector('label[data-testid="todo-item-label"]')
        fireEvent.doubleClick(itemLabel)
        const inputContainer = item.querySelector(".input-container")
        expect(inputContainer).not.toBeNull();
    })
}

function checkupdateItemComponentFunctionality() {
    jest.spyOn(reactRouterDOM,"useLocation").mockReturnValue({
        pathname:""
    })
    render(<Main todos={todos} dispatch={mockDispatch}/>)
    const todoList = screen.queryByTestId(TODO_LIST_TEST_ID)
    todos.forEach((todo,index) =>{
        const item = todoList.children.item(index)
        fireEvent.mouseEnter(item)
        const itemLabel = item.querySelector('label[data-testid="todo-item-label"]')
        fireEvent.doubleClick(itemLabel)
        const inputContainer = item.querySelector(".input-container")
        const input = inputContainer.querySelector(".new-todo")
        fireEvent.change(input,{target:{value:(input.value + " updated")}})
        fireEvent.keyDown(input,{key:"Enter",code:"Enter"})
        expect(mockDispatch).toHaveBeenCalledWith({ type: UPDATE_ITEM, payload: { id:todo.id, title:(todo.title + " updated")}})
    })
}

describe("Check main component functionality",()=>{
    test("check toogle functionality with mixed todos",checkToogleFunctionalityWithMixedTodos)
    test("check toogle functionality with active todos",checkToogleFunctionalityWithActiveTodos)
    test("check toogle functionality with completed todos",checkToogleFunctionalityWithCompletedTodos)
    test("Check remove todo item functionality",checkRemoveTodoItemfunctionality)
    test("Check item toogle button functionality",checkItemtoogleButtonFunctionality)
    test("Check writable on doubleClick functionality",checkDoubleClickFunctionality)
    test("Check update item component functionality",checkupdateItemComponentFunctionality)
})

