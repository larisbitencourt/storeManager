🏪 Store Manager API

Neste projeto, desenvolvi uma API RESTful completa para um sistema de gerenciamento de vendas. A aplicação utiliza a arquitetura MSC (Model, Service e Controller) para garantir uma estrutura organizada, testável e de fácil manutenção. O banco de dados utilizado para a persistência das informações foi o MongoDB.

➤ Tecnologias Utilizadas 💻

Node.js & Express: Base para a construção da API e gerenciamento de rotas.

MongoDB: Banco de dados NoSQL para armazenamento de produtos e vendas.

Arquitetura MSC: Divisão de responsabilidades entre as camadas de dados (Model), lógica de negócio (Service) e interface (Controller).

Joi: Biblioteca para validação de dados de entrada de forma robusta.

Mocha, Chai & Sinon: Ferramentas utilizadas para garantir a qualidade do código através de testes unitários.

Express-rescue: Middleware para tratamento de erros assíncronos de forma simplificada.

➤ Principais Funcionalidades 🚀

CRUD de Produtos: Criação, listagem, atualização e exclusão de itens no estoque com validações de nome e quantidade.

Gerenciamento de Vendas: Cadastro de vendas associadas a produtos existentes, com validação automática de estoque.

Controle de Estoque Inteligente: A quantidade de produtos é atualizada automaticamente ao realizar, editar ou deletar uma venda.

Tratamento de Erros Padronizado: Respostas HTTP consistentes para recursos não encontrados ou dados inválidos, seguindo os padrões REST.

➤ Habilidades Desenvolvidas 🧠

Arquitetura em Camadas: Domínio do padrão MSC para delegar responsabilidades específicas a cada parte do app.

Persistência NoSQL: Conexão e manipulação de collections no MongoDB utilizando o driver nativo.

Testes Automatizados: Implementação de testes para cada camada da aplicação, alcançando alta cobertura de código.

Desenvolvimento RESTful: Criação de endpoints intuitivos com o uso correto de verbos HTTP e códigos de status.