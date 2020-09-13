# Recuperação de senha

**RF**
- O usuario deve poder recuperar sua senha informando seu email
- O usuario deve recebeber um e-mail com instruções de recuperação de senha
- O usuario deve poder resetar sua senha

**RNF**

- Utilizar Mailtrap para testar envios em dev
- Utilizar o Amazon SES para envios em produção
- O envio de e-mails deve acontecer em segundo plano

**RN**

- O link enviado por email para resetar senha, deve experirar em 2h
- O usuario precisa confirmar a nova senha ao resetar sua senha

# Atualização do perfil

**RF**

- O usuario deve poder atualizar seu perfil, com nome, email e senha

**RN**
- O usuario não pode alterar seu email para um email ja utilizado
- Para atualizar sua senha, o usuario deve informar sua senha antiga
- Para atualizar sua senha, o usuario prcusa confirmar a nova senha

# Painel do prestador

**RF**

- O usuario deve poder listar seus agendamentos especificos
- O prestador deve receber uma notificação sempre que houver um novo agendamento
- O prestador deve poder visualizar as notificações não lidas

**RNF**

- Os agendamentos do prestador no dia devem ser armazenadas em chace
- As notificações do prestador devem ser armazendas no MongoDB
- As notificações do prestador devem ser enviadas em tempo real utilizando Socket.io

**RN**

- A notificação deve ter um status de lida ou não-lida, para que o pretador possa controlar

# Agendamento de serviços

**RF**
- O usuario deve poder listar todos prestadores de serviços cadastrados
- O usuario deve poder listar os dias dfe um mes com pelo menos um horario disponivel de um prestador
- O usuario deve poder listar horarios disponiveis em um dia especifico do prestador
- O usuario deve poder realizart um novo agendamento com o prestador

**RFN**
- A listagem de prestadores deve ser armazenadas em cache

**RN**

- Cada agendamento deve durar 1h
- os agendamentos devem estar disponiveis entre as 8h as 18h
- O usuario nao pode agendar em um horario ja ocupado
- 0 usuario nao pode agendar um horario que ja passou
- 0 usuario nao pode agendar serviços consigo mesmo 

