describe("Tickets", () => {
    beforeEach(() => cy.visit("https://ticket-box.s3.eu-central-1.amazonaws.com/index.html"));
    
    it("fills all the text input fields", () =>{
        const firstName = "Marina Teste";
        const lastName = "Barbosa";

        cy.get("#first-name").type(firstName);
        cy.get("#last-name").type(lastName);
        cy.get("#email").type("teste@teste.com.br");
        cy.get("#requests").type("não fumante");
        cy.get("#signature").type(`${firstName} ${lastName}`);
    });//Preencher todos os campos com texto

    it("select two tickets", () => {
        cy.get("#ticket-quantity").select("2");
    });
    
    it("select 'vip' ticket type", () => {
        cy.get("#vip").check();//verifica se o que passei no get, selecionando essa opçao
    });

    it("selects 'friend', and 'publication', then uncheck 'friend'", () => {
        cy.get("#friend").check();//marca essa opcao
        cy.get("#publication").check();
        cy.get("#friend").uncheck(); //desmarca essa opcao
    });

    it("has 'TICKETBOX' headr's heading", () => {
        cy.get("header h1").should("contain", "TICKETBOX");//DEVE CONTER NO HEADER H1  TICKETBOX
    }); //verifica se no header tem a palavra TICKETBOX no cabeçalho

    it("alerts on invalid email", () =>  { //informo um email invalido
        cy.get("#email")
          .as("email")//esse as é para apelidar o elemento
          .type("marina-gmail.com"); //email invalido

        cy.get("#email.invalid").should("exist");//elemento existe 

        cy.get("@email")
          .clear()//limpa o elemento invalido
          .type("marina@gmail.com");//informa o elemento valido

        cy.get("#email.invalid").should("not.exist");//verifica se elemento invalido não existe

    });

    it("fills and reset the form", () => { //preenche e reinicia o formulário
        const firstName = "Marina Teste";
        const lastName = "Barbosa";
        const fullName =  `${firstName} ${lastName}`;//sintaxe de declarar variavel do jquary

        cy.get("#first-name").type(firstName);
        cy.get("#last-name").type(lastName);
        cy.get("#email").type("teste@teste.com.br");
        cy.get("#ticket-quantity").select("2");
        cy.get("#vip").check();
        cy.get("#friend").check();
        cy.get("#requests").type("não fumante");

        cy.get(".agreement p").should( //verifica se o paragrafo esta de acordo com a informção preenchida acima vip e qtd de tickets
            "contain",
            `I, ${fullName}, wish to buy 2 VIP tickets`
        );

        cy.get("#agree").click();//clicar na caixa I agree, que é o ultimo campo obrigatorio
        cy.get("#signature").type(fullName); //informa assinatura que esta nessa variavel

        cy.get("button[type='submit']")
          .as("submitButton")//apelidando o botao
          .should("not.be.disabled");//verifica que o botão não está desabilitado

        cy.get("button[type='reset']").click();//clica no botao reset 

        cy.get("@submitButton").should("be.disabled");//verifica que o botao esta desabilitado
    });

    it("fill mandatory fields using support command", () => {//preenche campos obrigatórios usando o comando de suporte
      const customer = {
          firstName: "Eliel",
          lastName: "Tomaz",
          email: "eleil@email.com"
      };

      cy.fillMandatoryFilds(customer);

      cy.get("button[type='submit']")
        .as("submitButton")//apelidando o botao
        .should("not.be.disabled");//verifica que o botão não está desabilitado
      cy.get("button[type='reset']").click();//clica no botao reset 

      cy.get("@submitButton").should("be.disabled");
    });
});

