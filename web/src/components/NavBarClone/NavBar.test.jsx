// import fireEvent from '@testing-library/user-event'
//import React from 'react'

import { render, screen } from '@redwoodjs/testing/web'

import NavBar from './NavBar'

describe('NavBar', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<NavBar />)
    }).not.toThrow()
  })
  it('displays all pages', () => {
    render(<NavBar />)
    expect(() => {
      screen.getByText('Translate')
      screen.getByText('Feedback')
      screen.getByText('Help')
      screen.getByText('History')
      screen.getByText('Profile')
      screen.getByText('Log Out')
    }).not.toThrow()
  })
})
