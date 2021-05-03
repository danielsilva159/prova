# processo-seletivo
O teste foi feito com uma arquitetura bem simples para facilitar o entendimento. É um pequeno sistema para gerenciar os funcionários dos setores.
É possível **exibir** todos os funcionários existentes se os dados forem inseridos manualmente na base de dados.

É preciso que você implemente as funcionalidades de **inserir**, **editar** e 
**deletar** um funcionário.

Foi implementado apenas as classes relacionadas a entidade Funcionario.

# O que foi feito

1. Altera��o dos dados do funcionario
2. Exclus�o do funcionario
3. Cria��o de novo funcionario
4. Cria��o de novo setor 
5. Altera��o do nome de setor criado
6. Exclus�o de setor que n�o tenha funcionario vinculado

# Para testar o sistema

Para testar o sistema e preciso ter o MYSQL instalado no seu computado e o tomCat 9 configurado no eclipse.
Depois de ter instalado o MYSQL e preciso criar a database dentro do MYSQL com o comando " CREATE database funcionarios_prova "
N�o e preciso criar as tabelas, pois o sistema criar sozinho.
Depois de criar a base de dados e preciso ir no arquivo persistence.xml e fazer a altera��o do usuario e senha, e colocar o respectivo usuario e senha do seu MYSQL.
Ap�s a configura��o do arquivo persistence.xml, agora so e preciso adicionar o projeto no tomCat 9 e iniciar o servidor.


