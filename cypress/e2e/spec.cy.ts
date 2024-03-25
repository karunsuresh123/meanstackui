describe('My First Test', () => {
  it('Visits the initial project page', () => {
    cy.visit('/')
    cy.contains('MEAN Stack')
    cy.contains('ToDo List Demo')
  })
})
