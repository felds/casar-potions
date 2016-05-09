# Casar/Potions<br>

Este é um projeto de exemplo e foi construído como prova para o processo seletivo da empresa Casar.

Deve levar-se em consideração que nem todas as funcionalidades estão completas e/ou presentes por tratar-se apenas de um exemplo.

Ele foi construído de forma a facilitar a visualização e, por isso, não segue algumas melhores práticas (por exemplo: foi usado o Sqlite e o servidor de teste do PHP).



## Instalação

Para rodar o projeto, é necessário que o computador [preencha os requisitos do Symfony3][requirements].

*O guia também assume que o computador possui o [composer instalado e acessível de forma global][composer-installation].*


### 1.Download

Faça o clone do projeto no seu computador:

```sh
git clone https://felds@bitbucket.org/felds/casar-potions.git
```


### 2. Instalação

No diretório raiz do projeto, execute o comando:

```sh
composer install
# Cria o banco de dados
php bin/console doctrine:database:create
# Popula o banco de dados
php bin/console doctrine:fixtures:
```

### Execução

No diretório raiz do projeto, execute o comando:

```sh
php bin/console server:run
```



[requirements]: http://symfony.com/doc/current/reference/requirements.html "Requerimentos do Symfony 3"
[composer-installation]: https://getcomposer.org/doc/00-intro.md#globally "Como instalar o composer de forma global"

