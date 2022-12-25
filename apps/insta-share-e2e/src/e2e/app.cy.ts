describe('insta-share', () => {
  describe('entry-point',  () => {   
    beforeEach(() => cy.visit('/'));
    it('should display hello message', () => {
      cy.get('h2').contains('Hello there');
    });
  
    it('should go to login on button "Sign in" click', () => {
      cy.get('button').click();
      cy.get('h1').contains('Sign in');
      cy.get('input').focused()
    })
  })

  describe('sign-in flow', () => {
    beforeEach(() => cy.visit('/signin'));
    
    it('should go to signup con signup click', () => {
      cy.get('a').click();
      
      cy.get('h1').contains('Sign up')
    })
  })

});


