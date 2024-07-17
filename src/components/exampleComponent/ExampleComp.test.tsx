import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import ExampleComponent from './ExampleComp'
import { ExampleComponentProps } from './ExampleComp.types'

// this is to mock the inputs for the component!!!
const defaultProps: ExampleComponentProps = {
  title: 'Test Title',
  isActive: true,
  onClick: jest.fn(),
}

test('renders title and isActive state correctly', () => {
  render(<ExampleComponent {...defaultProps} />)

  const titleElement = screen.getByText(/Test Title/i) // TODO: maybe try out getByRole ? maybe its better/accurate
  expect(titleElement).toBeInTheDocument()

  const isActiveElement = screen.getByText(/Active/i)
  expect(isActiveElement).toBeInTheDocument()
})

test('calls onClick when button is clicked', () => {
  render(<ExampleComponent {...defaultProps} />)

  const buttonElement = screen.getByText(/Click me/i)
  fireEvent.click(buttonElement) // this is to simulate "button clicking"
  expect(defaultProps.onClick).toHaveBeenCalled() // then we check if the button calls the onclick
})

test('increments count when Increment button is clicked', () => {
  render(<ExampleComponent {...defaultProps} />)

  const countElement = screen.getByText(/Count: 0/i)
  expect(countElement).toBeInTheDocument()

  const incrementButton = screen.getByText(/Increment/i)
  fireEvent.click(incrementButton)

  const incrementedCountElement = screen.getByText(/Count: 1/i)
  expect(incrementedCountElement).toBeInTheDocument()
})
