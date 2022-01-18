# Conclusões sobre o projeto

Projeto simples de consumo de api, utilizei os endpoints "search/users", "/users" e "/repos" para apresentar os dados que já vieram nas respostas e também para criar outros dados como o gráfico donnut das principais linguagens do usuário baseado no número de repositórios.

Busquei apresentar um layout simples e intuitivo, as opções e o modo de uso são claros, o cliente entra pesquisa por nome usuários do GitHub e clicando no card do usuário ele tem acesso aos detalhes da conta.

## Pontos a destacar:

1. Na primeira tela onde mostra os cards tentei colocar mais dados, mas a API retornava que a aplicação tinha excedido a taxa limite de requisições, por isso dentro do card deixei um link "Exibir detalhes" assim as requisições que se referem a detalhes da conta do usuário são feitas individualmente, após o acesso pelo card.
2. Pelo motivo do ponto 1 abandonei o código que fazia as requisições dos usuários na primeira tela e apenas listei o resultado da pesquisa.
3. Projeto desenvolvido completamente do zero, inclusive os gráficos em svg, apenas o arquivo "colors.js" que copiei de um repositório do GitHub para ter acesso as cores da linguagens.
4. Durante o desenvolvimento não houve alteração no layout, ele seguiu a ideia inicial, bem simples e intuitivo.

## Ideias que eu gostaria de implementar se tivesse mais tempo:

- Mais gráficos com detalhes e estatísticas da atividade do usuário.
- Ler com mais tempo a documentação da API e implementar uma solução pra aumentar o "rate limit" e assim conseguir escalar a aplicação.
- Sistema de paginação nos repositórios.
- Adicionar também sistema de filtro na seção dos repositórios, por data do último commit, mais populares, data de criação e etc.
- Melhora no design, rever a paleta de cores e o layout buscando dar mais personalidade ao projeto.
