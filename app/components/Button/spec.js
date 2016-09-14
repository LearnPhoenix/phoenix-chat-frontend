import React from "react"
import expect from "expect"
import { shallow } from "enzyme"

import { Button } from "./"

const props = {
  type: "primary",
  onClick: () => {}
}

describe("<Button />", () => {
  it("should render its children", () => {
    const children = (<p>foo</p>)
    const renderedComponent = shallow(
      <Button {...props}>
        { children }
      </Button>
    )
    expect(renderedComponent.contains(children))
  })
  it("should render a <button> element", () => {
    const renderedComponent = shallow(
      <Button {...props}>
        Test
      </Button>
    )
    expect(renderedComponent.is("button")).toEqual(true)
  })
  it("should handle click events", () => {
    const onClickSpy = expect.createSpy()
    const renderedComponent = shallow(
      <Button {...props} onClick={onClickSpy}>
        Test
      </Button>
    )
    renderedComponent.find("button").simulate("click");
    expect(onClickSpy).toHaveBeenCalled();
  })
})
