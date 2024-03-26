import { render, screen, waitFor, fireEvent } from '@redwoodjs/testing/web'
import HomePage from './HomePage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('HomePage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<HomePage />)
    }).not.toThrow()
  })
})

test('NavLinks paths 1', () => {
  nav = wrapper.find('nav');
  NavLink = wrapper.find('NavLink')
  expect(wrapper.find('NavLink')).toHaveLength(5)
  const firstNavLink = wrapper.find('NavLink').first();
  expect(firstNavLink.prop('to')).toEqual('/translate');
})

test('NavLinks paths 2', () => {
  nav = wrapper.find('nav');
  NavLink = wrapper.find('NavLink')
  expect(wrapper.find('NavLink')).toHaveLength(5)
  const secondNavLink = wrapper.find('NavLink').at(1)
  expect(secondNavLink.prop('to')).toEqual('/feedback');
})

test('NavLinks paths 3', () => {
  nav = wrapper.find('nav');
  NavLink = wrapper.find('NavLink')
  expect(wrapper.find('NavLink')).toHaveLength(5)
  const thirdNavLink = wrapper.find('NavLink').at(2)
  expect(thirdNavLink.prop('to')).toEqual('/help');

})

test('NavLinks paths 4', () => {
  nav = wrapper.find('nav');
  NavLink = wrapper.find('NavLink')
  expect(wrapper.find('NavLink')).toHaveLength(5)
  const fourthNavLink = wrapper.find('NavLink').at(3)
  expect(fourthNavLink.prop('to')).toEqual('/history');
})

test('NavLinks paths 5', () => {
  nav = wrapper.find('nav');
  NavLink = wrapper.find('NavLink')
  expect(wrapper.find('NavLink')).toHaveLength(5)
  const fifthNavLink = wrapper.find('NavLink').at(4)
  expect(fifthNavLink.prop('to')).toEqual('/logout');
})