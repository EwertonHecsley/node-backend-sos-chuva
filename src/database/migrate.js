const db = require('../config/databaseConnect');
const { Logger } = require('../config/validateEnvironment');

const runMigrations = async () => {
  const queryText = `
    BEGIN;

    -- 1. Criar Tipos ENUM (equivalentes aos types do TS)
    DO $$ BEGIN
        CREATE TYPE user_type AS ENUM ('volunteer', 'need-help');
        CREATE TYPE urgency_level AS ENUM ('critical', 'high', 'medium', 'low');
        CREATE TYPE missing_type AS ENUM ('person', 'child', 'animal');
        CREATE TYPE need_status AS ENUM ('pending', 'in-progress', 'resolved');
        CREATE TYPE help_request_status AS ENUM ('pending', 'accepted', 'declined');
        CREATE TYPE volunteer_status AS ENUM ('available', 'busy');
        CREATE TYPE missing_status AS ENUM ('missing', 'found');
    EXCEPTION
        WHEN duplicate_object THEN null;
    END $$;

    -- 2. Tabela de Usuários
    CREATE TABLE IF NOT EXISTS usuarios (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL, -- Importante para o backend
      phone TEXT NOT NULL,
      type user_type NOT NULL,
      location TEXT NOT NULL,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );

    -- 3. Tabela de Voluntários (Extensão do usuário)
    CREATE TABLE IF NOT EXISTS voluntarios (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      user_id UUID REFERENCES usuarios(id) ON DELETE CASCADE,
      skills TEXT[], -- Array de strings
      availability TEXT NOT NULL,
      status volunteer_status DEFAULT 'available',
      helped_count INTEGER DEFAULT 0
    );

    -- 4. Tabela de Necessidades (Needs)
    CREATE TABLE IF NOT EXISTS necessidades (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      user_id UUID REFERENCES usuarios(id) ON DELETE CASCADE,
      category TEXT NOT NULL,
      description TEXT NOT NULL,
      urgency urgency_level NOT NULL,
      status need_status DEFAULT 'pending',
      volunteer_id UUID REFERENCES voluntarios(id) ON DELETE SET NULL,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );

    -- 5. Tabela de Pessoas/Animais Desaparecidos
    CREATE TABLE IF NOT EXISTS desaparecidos (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      reported_by UUID REFERENCES usuarios(id) ON DELETE CASCADE,
      name TEXT NOT NULL,
      age INTEGER,
      type missing_type NOT NULL,
      description TEXT NOT NULL,
      last_seen_location TEXT NOT NULL,
      last_seen_date TIMESTAMP WITH TIME ZONE NOT NULL,
      photo_url TEXT,
      status missing_status DEFAULT 'missing',
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );

    -- 6. Tabela de Pedidos de Ajuda (Help Requests)
    CREATE TABLE IF NOT EXISTS pedidos_ajuda (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      need_user_id UUID REFERENCES usuarios(id) ON DELETE CASCADE,
      volunteer_id UUID REFERENCES voluntarios(id) ON DELETE CASCADE,
      message TEXT NOT NULL,
      status help_request_status DEFAULT 'pending',
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );

    COMMIT;
  `;

  try {
    await db.query(queryText);
    Logger.info('✅ Migrations executadas com sucesso!');
    process.exit(0);
  } catch (err) {
    await db.query('ROLLBACK;');
    Logger.error('❌ Erro ao rodar migrations:', err);
    process.exit(1);
  }
};

runMigrations();
