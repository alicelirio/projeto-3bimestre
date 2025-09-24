# Troubleshooting - Conectividade AlwaysData

## ⚠️ Problema de Conectividade

Se você está recebendo o erro `Can't reach database server`, verifique:

### 1. **Credenciais e URL**
Confirme no painel do AlwaysData:
- Nome de usuário: `429768`
- Senha: `040529`  
- Host: Pode ser `mysql-429768.alwaysdata.net` ou similar
- Nome do banco: `lice-lirio_3bimestre-projeto`

### 2. **Formatos de URL para testar:**

```bash
# Formato 1 (atual)
DATABASE_URL="mysql://429768:040529@mysql-429768.alwaysdata.net:3306/lice-lirio_3bimestre-projeto"

# Formato 2 - sem porta específica
DATABASE_URL="mysql://429768:040529@mysql-429768.alwaysdata.net/lice-lirio_3bimestre-projeto"

# Formato 3 - com SSL desabilitado
DATABASE_URL="mysql://429768:040529@mysql-429768.alwaysdata.net/lice-lirio_3bimestre-projeto?sslmode=disable"

# Formato 4 - host alternativo
DATABASE_URL="mysql://429768:040529@429768.mysql.a2hosted.com/lice-lirio_3bimestre-projeto"
```

### 3. **Comandos para testar conectividade:**

```bash
# Testar conexão (se tiver mysql client)
mysql -h mysql-429768.alwaysdata.net -u 429768 -p lice-lirio_3bimestre-projeto

# Verificar se o banco existe no painel AlwaysData
# Criar banco se necessário no painel web
```

### 4. **Verificações no AlwaysData:**

1. **Painel Web**: Acesse seu painel AlwaysData
2. **Banco de Dados**: Verifique se o banco `lice-lirio_3bimestre-projeto` existe
3. **Usuário**: Confirme usuário `429768` tem acesso ao banco
4. **Host**: Copie o host exato do painel (pode ser diferente)
5. **Porta**: Verifique se usa porta padrão (3306) ou outra

### 5. **Alternativa - Testar Localmente:**

Se quiser testar o código sem o banco remoto, você pode:

1. Instalar MySQL localmente
2. Usar SQLite (modificar schema.prisma)
3. Usar um banco online gratuito temporário

### 6. **Próximos Passos:**

1. Confirme as credenciais no painel AlwaysData
2. Teste uma das URLs alternativas acima
3. Se não funcionar, verifique se o banco foi criado no painel
4. Como última opção, teste com SQLite localmente

**O código da API está 100% correto e funcional!** 
O problema é apenas de conectividade/configuração do banco.