describe("Upload a image", () => {
  it("upload a image using button", () => {
    cy.visit("http://localhost:3000");

    //cy.get('[data-testid="upload-button"]').selectFile("public/devchallenges.png");

    cy.contains('Uploaded Succesfully!');
  });
});
