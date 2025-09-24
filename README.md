# API Marketplace - 3º Bimestre

Uma API REST para simular um marketplace simples com relacionamentos entre usuários, lojas e produtos.

## 📋 Modelos

### Relacionamentos
- **1-1**: User → Store (cada usuário tem uma única loja)
- **1-N**: Store → Product (cada loja tem vários produtos)

### Estrutura dos Modelos

```prisma
model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  name      String?
  password  String
  store     Store?   // 1-1: um usuário tem uma loja
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Store {
  id        Int       @id @default(autoincrement())
  name      String
  userId    Int       @unique
  user      User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  products  Product[] // 1-N: uma loja tem vários produtos
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt
}

model Product {
  id        Int      @id @default(autoincrement())
  name      String
  price     Decimal  @db.Decimal(10,2)
  storeId   Int
  store     Store    @relation(fields: [storeId], references: [id], onDelete: Cascade)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

## 🚀 Configuração

### 1. Variáveis de Ambiente

Copie o arquivo `.env.example` para `.env` e configure sua string de conexão do AlwaysData:

```bash
DATABASE_URL="mysql://USUARIO:SENHA@mysql-USUARIO.alwaysdata.net/NOME_DO_BANCO"
PORT=3000
```

### 2. Instalação e Deploy

```bash
# Instalar dependências
npm install

# Gerar cliente Prisma
npx prisma generate

# Aplicar schema no AlwaysData (usar sempre este comando)
npx prisma db push

# Iniciar servidor
npm start

# Desenvolvimento (com nodemon)
npm run dev
```

⚠️ **Importante**: Use sempre `prisma db push` no AlwaysData, não `prisma migrate dev`.

## 📚 API Endpoints

### 👤 Usuários

- `POST /usuarios` - Criar usuário
- `GET /usuarios` - Listar usuários

### 🏪 Lojas (Stores)

- `POST /stores` - Criar loja
  ```json
  {
    "name": "Nome da Loja",
    "userId": 1
  }
  ```

- `GET /stores` - Listar todas as lojas (inclui dono e produtos)
- `GET /stores/:id` - Obter loja específica (inclui dono e produtos)
- `PUT /stores/:id` - Atualizar loja
  ```json
  {
    "name": "Novo Nome da Loja"
  }
  ```
- `DELETE /stores/:id` - Deletar loja

### 📦 Produtos (Products)

- `POST /products` - Criar produto
  ```json
  {
    "name": "Nome do Produto",
    "price": 99.99,
    "storeId": 1
  }
  ```

- `GET /products` - Listar todos os produtos (inclui loja e dono)
- `GET /products/:id` - Obter produto específico (inclui loja e dono)
- `PUT /products/:id` - Atualizar produto
  ```json
  {
    "name": "Novo Nome do Produto",
    "price": 149.99
  }
  ```
- `DELETE /products/:id` - Deletar produto

### 🔍 Rotas de Teste

- `GET /` - Health check
- `GET /status` - Status da API

## 📖 Exemplos de Uso

### 1. Criar um usuário
```bash
POST /usuarios
{
  "name": "João Silva",
  "email": "joao@email.com",
  "password": "123456"
}
```

### 2. Criar uma loja para o usuário
```bash
POST /stores
{
  "name": "Loja do João",
  "userId": 1
}
```

### 3. Adicionar produtos à loja
```bash
POST /products
{
  "name": "Smartphone",
  "price": 899.99,
  "storeId": 1
}
```

### 4. Consultar loja com produtos e dono
```bash
GET /stores/1
```

Retorna:
```json
{
  "id": 1,
  "name": "Loja do João",
  "userId": 1,
  "user": {
    "id": 1,
    "name": "João Silva",
    "email": "joao@email.com"
  },
  "products": [
    {
      "id": 1,
      "name": "Smartphone",
      "price": "899.99",
      "storeId": 1
    }
  ]
}
```

## ✅ Checklist de Entrega

- ✅ Schema atualizado com modelos Store e Product
- ✅ Relacionamento 1-1 (User → Store) implementado
- ✅ Relacionamento 1-N (Store → Product) implementado
- ✅ CRUD completo para Stores (POST, GET, PUT, DELETE)
- ✅ CRUD completo para Products (POST, GET, PUT, DELETE)
- ✅ GET /stores/:id retorna dono e produtos
- ✅ GET /products retorna loja e dono
- ✅ Tratamento básico de erros
- ✅ Código organizado e documentado

## 🛠️ Tecnologias

- Node.js
- Express.js
- Prisma ORM
- MySQL (AlwaysData)
- dotenv