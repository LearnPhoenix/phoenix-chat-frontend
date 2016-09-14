import React from "react"
import expect from "expect"
import { shallow } from "enzyme"

import { Signup } from './'

describe('<Signup />', () => {
  it('should render', () => {
    const renderedComponent = shallow(
      <Signup />
    )
    expect(renderedComponent.is('div')).toEqual(true)
  })
  it('should have a submit function', () => {
    const component = new Signup()
    expect(component.submit).toExist()
  })
  // TODO need update
  // it('should call submit function when button is clicked', () => {
  //   const renderedComponent = shallow(
  //     <Signup />
  //   )
  //   const spy = expect.spyOn(renderedComponent.instance(), 'submit')
  //   renderedComponent.find('button').simulate('click')
  //   expect(spy).toHaveBeenCalled()
  // })
})
