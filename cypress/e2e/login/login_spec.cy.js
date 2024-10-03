describe("Kullanıcı Girişi", () => {
  it("Şifre girilmemişse buton etkinleştiriliyor mu ?", () => {
    cy.visit("http://localhost:5174/");
    cy.get('input[data-cy="email"]').type("test@hotmail.com");
    cy.get('input[name="password"]').type("");
    cy.get('input[name="terms"]').check();
    cy.get('button[name="loginbtn"]').click();
    cy.url().should("include", "/success");
  });
  it("Şartlar kabul edilmemişse buton etkileşime girilebiliyor mu ?", () => {
    cy.visit("http://localhost:5174/");
    cy.get('input[name="email"]').type("test@hotmail.com");
    cy.get('input[name="password"]').type("123456");
    cy.get('input[name="terms"]').check(false);
    cy.get('button[name="loginbtn"]').click();
    cy.url().should("include", "/success");
  });

  it("Kullanıcı geçersiz bilgi girerse hata vermeli", () => {
    cy.visit("http://localhost:5174/");
    cy.get('input[name="email"]').type("test@hotmail.com");
    cy.get('input[name="password"]').type("123456");
    cy.get('input[name="terms"]').check();
    cy.get('button[name="loginbtn"]').click();
    cy.url().should("include", "/success");
  });
  it("Kullanıcı geçerli bilgilerle giriş yapabilmeli", () => {
    cy.visit("http://localhost:5174/");
    cy.get('input[name="email"]').type("aliyzbsi68@hotmail.com");
    cy.get('input[name="password"]').type("123456");
    cy.get('input[name="terms"]').check();
    cy.get('button[name="loginbtn"]').click();
    cy.url().should("include", "/success");
  });
});
