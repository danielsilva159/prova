# processo-seletivo
O teste foi feito com uma arquitetura bem simples para facilitar o entendimento. Ã‰ um pequeno sistema para gerenciar os funcionÃ¡rios dos setores.
Ã‰ possÃ­vel **exibir** todos os funcionÃ¡rios existentes se os dados forem inseridos manualmente na base de dados.

Ã‰ preciso que vocÃª implemente as funcionalidades de **inserir**, **editar** e 
**deletar** um funcionÃ¡rio.

Foi implementado apenas as classes relacionadas a entidade Funcionario.

# O que foi feito

1. Alteração dos dados do funcionario
2. Exclusão do funcionario
3. Criação de novo funcionario
4. Criação de novo setor 
5. Alteração do nome de setor criado
6. Exclusão de setor que não tenha funcionario vinculado

# Para testar o sistema

Para testar o sistema e preciso ter o MYSQL instalado no seu computado e o tomCat 9 configurado no eclipse.
Depois de ter instalado o MYSQL e preciso criar a database dentro do MYSQL com o comando " CREATE database funcionarios_prova "
Não e preciso criar as tabelas, pois o sistema criar sozinho.
Depois de criar a base de dados e preciso ir no arquivo persistence.xml e fazer a alteração do usuario e senha, e colocar o respectivo usuario e senha do seu MYSQL.
Após a configuração do arquivo persistence.xml, agora so e preciso adicionar o projeto no tomCat 9 e iniciar o servidor.


