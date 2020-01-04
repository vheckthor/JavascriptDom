//#region jest setup
const jsdom = require("jsdom");
const fs = require("fs");
const path = require("path");

const indexFile = fs.readFileSync(path.join(__dirname, "../dom.html"), {
  encoding: "utf-8"
});
const jsFile = fs.readFileSync(path.join(__dirname, "../quizpage.js"), {
  encoding: "utf-8"
});

let window;
let document;
let virtualDOM;

beforeEach(() => {
  const resourceLoader = new jsdom.ResourceLoader({
    userAgent: "jsDom"
  });

  virtualDOM = new jsdom.JSDOM(indexFile, {
    runScripts: "dangerously",
    resources: resourceLoader
  });
  //to import the script file
  

  window = virtualDOM.window;
  document = window.document;
  
  let script = document.getElementsByTagName("script")[0];
  script.setAttribute("src",jsFile);
});

//#endregion

const { getByLabelText, getByText,getByPlaceholderText } = require("@testing-library/dom");
const  { queryAllBy } =  require("@testing-library/jest-dom");
const userEvent = require("@testing-library/user-event").default;

describe("Username App", () => {
  test("Should render Search div", () => {
  //  expect(getByLabelText(document, "Username")).not.toBeNull();
    expect(getByText(document, /Click to Search/)).not.toBeNull();
  });

  test("Should show the input textarea", () => {
  //  window.alert = jest.fn();
   // const userInput = getByText(document, /Print Username/);

    expect(getByPlaceholderText(document,"Input todo here")).not.toBeNull();
    // userEvent.click(usernameBtn);

    // expect(window.alert).toHaveBeenCalledTimes(1);
    // expect(window.alert).toHaveBeenCalledWith("You have to type in a username");
  });

  test("button clicker",()=>{
    //const usernameBtn = getByText(document, /add Todo/);
    expect(getByText(document, /add Todo/)).not.toBeNull();
  })

  test("Add to table and display it", () =>{
    const usernameInput = getByLabelText (document, "Search Todo Here");
    const usernameBtn = getByText(document, /Click to Search/);
    //expect(getByText(document, /add Todo/)).not.toBeNull();

    userEvent.type(usernameInput, "");
    userEvent.click(usernameBtn);

    expect(getByText(document, )).not.toBeNull();
  });
});
