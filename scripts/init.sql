-- ======================
-- CRIAÇÃO DO BANCO
-- ======================

CREATE DATABASE IF NOT EXISTS db_estudai
DEFAULT CHARACTER SET utf8mb4
DEFAULT COLLATE utf8mb4_unicode_ci;

USE db_estudai;

SET NAMES utf8mb4;
SET CHARACTER SET utf8mb4;
SET collation_connection = 'utf8mb4_unicode_ci';



-- ======================
-- TABELAS
-- ======================

CREATE TABLE Usuario (
    Cod_usuario INT AUTO_INCREMENT PRIMARY KEY,
    Num_matricula INT NOT NULL UNIQUE,
    Email VARCHAR(100) NOT NULL,
    CPF VARCHAR(11) NOT NULL,
    Senha VARCHAR(255) NOT NULL,
    Nome VARCHAR(255) NOT NULL,
    Data_nascimento DATE NOT NULL,
    Sexo CHAR(1) NOT NULL CHECK (Sexo IN ('M','F')),
    Cod_curso INT,
    Tipo_usuario CHAR(1) NOT NULL CHECK (Tipo_usuario IN ('A','U')),
    Semestre INT NULL
);

CREATE TABLE Telefone (
    Cod_fone INT AUTO_INCREMENT PRIMARY KEY,
    Cod_usuario INT NOT NULL,
    Numero VARCHAR(11) NOT NULL,
    Tipo CHAR(1) NOT NULL CHECK (Tipo IN ('C','R')),
    DDD VARCHAR(4) NOT NULL,
    FOREIGN KEY (Cod_usuario) REFERENCES Usuario(Cod_usuario) ON DELETE CASCADE
);

CREATE TABLE Endereco (
    Cod_endereco INT AUTO_INCREMENT PRIMARY KEY,
    CEP VARCHAR(9) NOT NULL,
    Bairro VARCHAR(255) NOT NULL,
    Estado VARCHAR(255) NOT NULL,
    Cidade VARCHAR(255) NOT NULL,
    Cod_usuario INT NOT NULL,
    FOREIGN KEY (Cod_usuario) REFERENCES Usuario(Cod_usuario) ON DELETE CASCADE
);

CREATE TABLE Curso (
    Cod_curso INT AUTO_INCREMENT PRIMARY KEY,
    Nome_curso VARCHAR(255) NOT NULL,
    Periodo VARCHAR(255) NOT NULL,
    Tipo_curso VARCHAR(255) NOT NULL
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE Usuario_Curso (
    Cod_usuario_curso INT AUTO_INCREMENT PRIMARY KEY,
    Cod_usuario INT NOT NULL,
    Cod_curso INT NOT NULL,
    FOREIGN KEY (Cod_usuario) REFERENCES Usuario(Cod_usuario) ON DELETE CASCADE,
    FOREIGN KEY (Cod_curso) REFERENCES Curso(Cod_curso) ON DELETE CASCADE
);

CREATE TABLE Postagem (
    Cod_postagem INT AUTO_INCREMENT PRIMARY KEY,
    Cod_usuario INT NOT NULL,
    Texto TEXT,
    CaminhoMidia VARCHAR(255),
    Tipo_midia VARCHAR(50),
    Data_postagem DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    Tipo_postagem INT NOT NULL CHECK (Tipo_postagem IN (1,2)),
    FOREIGN KEY (Cod_usuario) REFERENCES Usuario(Cod_usuario) ON DELETE CASCADE
);

CREATE TABLE Interacao (
    Cod_interacao INT AUTO_INCREMENT PRIMARY KEY,
    Cod_usuario INT NOT NULL,
    Cod_postagem INT NOT NULL,
    Tipo_interacao INT NOT NULL CHECK (Tipo_interacao IN (1,2,3)),
    Comentario TEXT NULL,
    Data_interacao DATE NOT NULL,
    FOREIGN KEY (Cod_usuario) REFERENCES Usuario(Cod_usuario) ON DELETE CASCADE,
    FOREIGN KEY (Cod_postagem) REFERENCES Postagem(Cod_postagem) ON DELETE CASCADE
);

CREATE TABLE Duvida (
    Cod_duvida INT AUTO_INCREMENT PRIMARY KEY,
    Cod_usuario INT NOT NULL,
    Pergunta VARCHAR(255) NOT NULL,
    Resposta VARCHAR(255) NOT NULL,
    Data_envio DATE NOT NULL,
    FOREIGN KEY (Cod_usuario) REFERENCES Usuario(Cod_usuario) ON DELETE CASCADE
);

CREATE TABLE Conexao (
    Cod_conexao INT AUTO_INCREMENT PRIMARY KEY,
    Cod_usuario INT NOT NULL,
    Cod_usuario2 INT NOT NULL,
    Status CHAR(1) NOT NULL CHECK (Status IN ('P','A','R')),
    Data_conexao DATE NOT NULL,
    FOREIGN KEY (Cod_usuario) REFERENCES Usuario(Cod_usuario) ON DELETE CASCADE,
    FOREIGN KEY (Cod_usuario2) REFERENCES Usuario(Cod_usuario) ON DELETE CASCADE,
    UNIQUE (Cod_usuario, Cod_usuario2)
);

CREATE TABLE Grupo (
    Cod_grupo INT AUTO_INCREMENT PRIMARY KEY,
    Nome VARCHAR(100) NOT NULL,
    Descricao TEXT NOT NULL,
    Data_criacao DATE NOT NULL
);

CREATE TABLE Mensagem (
    Cod_mensagem INT AUTO_INCREMENT PRIMARY KEY,
    Cod_usuario INT NULL,
    Cod_grupo INT NOT NULL,
    Conteudo TEXT NOT NULL,
    Data_envio DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    IsIA BOOLEAN NOT NULL DEFAULT FALSE,
    FOREIGN KEY (Cod_usuario) REFERENCES Usuario(Cod_usuario) ON DELETE CASCADE,
    FOREIGN KEY (Cod_grupo) REFERENCES Grupo(Cod_grupo) ON DELETE CASCADE
);


CREATE TABLE Usuario_Grupo (
    Cod_usuario_grupo INT AUTO_INCREMENT PRIMARY KEY,
    Cod_usuario INT NOT NULL,
    Cod_grupo INT NOT NULL,
    Data_entrada DATE NOT NULL,
    FOREIGN KEY (Cod_usuario) REFERENCES Usuario(Cod_usuario) ON DELETE CASCADE,
    FOREIGN KEY (Cod_grupo) REFERENCES Grupo(Cod_grupo) ON DELETE CASCADE
);

-- ======================
-- ÍNDICES
-- ======================

CREATE INDEX idx_usuario_email ON Usuario (Email);
CREATE INDEX idx_grupo_nome ON Grupo (Nome);
CREATE INDEX idx_mensagem_grupo_data ON Mensagem (Cod_grupo, Data_envio);
CREATE INDEX idx_mensagem_usuario ON Mensagem (Cod_usuario);
CREATE INDEX idx_conexao_usuario1 ON Conexao (Cod_usuario);
CREATE INDEX idx_conexao_usuario2 ON Conexao (Cod_usuario2);
CREATE INDEX idx_postagem_usuario ON Postagem (Cod_usuario);
CREATE INDEX idx_postagem_data ON Postagem (Data_postagem);
CREATE INDEX idx_interacao_postagem ON Interacao (Cod_postagem);
CREATE INDEX idx_interacao_usuario ON Interacao (Cod_usuario);
CREATE INDEX idx_duvida_usuario ON Duvida (Cod_usuario);
CREATE INDEX idx_duvida_data ON Duvida (Data_envio);

-- ======================
-- VIEWS
-- ======================

CREATE VIEW vw_usuarios_cursos AS
SELECT u.Cod_usuario,
       u.Nome AS Nome_usuario,
       c.Nome_curso,
       c.Periodo,
       c.Tipo_curso
FROM Usuario u
JOIN Usuario_Curso uc ON u.Cod_usuario = uc.Cod_usuario
JOIN Curso c ON uc.Cod_curso = c.Cod_curso;

CREATE VIEW vw_usuarios_grupos AS
SELECT u.Cod_usuario,
       u.Nome AS Nome_usuario,
       g.Cod_grupo,
       g.Nome AS Nome_grupo,
       ug.Data_entrada
FROM Usuario u
JOIN Usuario_Grupo ug ON u.Cod_usuario = ug.Cod_usuario
JOIN Grupo g ON ug.Cod_grupo = g.Cod_grupo;

CREATE VIEW vw_postagens_interacoes AS
SELECT p.Cod_postagem,
       u.Nome AS Autor,
       p.Data_postagem,
       p.Texto,
       i.Tipo_interacao,
       i.Comentario,
       i.Data_interacao,
       ui.Nome AS Usuario_interagiu
FROM Postagem p
JOIN Usuario u ON p.Cod_usuario = u.Cod_usuario
LEFT JOIN Interacao i ON p.Cod_postagem = i.Cod_postagem
LEFT JOIN Usuario ui ON i.Cod_usuario = ui.Cod_usuario;

CREATE VIEW vw_conexoes AS
SELECT c.Cod_conexao,
       u1.Nome AS Usuario1,
       u2.Nome AS Usuario2,
       c.Status,
       c.Data_conexao
FROM Conexao c
JOIN Usuario u1 ON c.Cod_usuario = u1.Cod_usuario
JOIN Usuario u2 ON c.Cod_usuario2 = u2.Cod_usuario;

CREATE VIEW vw_duvidas AS
SELECT d.Cod_duvida,
       d.Pergunta,
       d.Resposta,
       d.Data_envio,
       u.Nome AS Autor
FROM Duvida d
JOIN Usuario u ON d.Cod_usuario = u.Cod_usuario;

-- ======================
-- CURSOS (SEED)
-- ======================

INSERT INTO Curso (Nome_curso, Periodo, Tipo_curso) VALUES
('Engenharia Civil', 'Integral', 'Bacharelado'),
('Engenharia Mecânica', 'Integral', 'Bacharelado'),
('Engenharia de Produção', 'Noturno', 'Bacharelado'),
('Engenharia Elétrica', 'Integral', 'Bacharelado'),
('Engenharia de Computação', 'Integral', 'Bacharelado'),
('Ciência da Computação', 'Noturno', 'Bacharelado'),
('Sistemas de Informação', 'Noturno', 'Bacharelado'),
('Matemática', 'Noturno', 'Licenciatura'),
('Física', 'Noturno', 'Licenciatura'),
('Química', 'Noturno', 'Licenciatura'),
('Direito', 'Noturno', 'Bacharelado'),
('Administração', 'Noturno', 'Bacharelado'),
('Ciências Contábeis', 'Noturno', 'Bacharelado'),
('Economia', 'Integral', 'Bacharelado'),
('Psicologia', 'Integral', 'Bacharelado'),
('Sociologia', 'Noturno', 'Licenciatura'),
('Filosofia', 'Noturno', 'Licenciatura'),
('Pedagogia', 'Noturno', 'Licenciatura'),
('História', 'Noturno', 'Licenciatura'),
('Geografia', 'Noturno', 'Licenciatura'),
('Medicina', 'Integral', 'Bacharelado'),
('Enfermagem', 'Integral', 'Bacharelado'),
('Biomedicina', 'Integral', 'Bacharelado'),
('Educação Física', 'Noturno', 'Licenciatura'),
('Nutrição', 'Integral', 'Bacharelado'),
('Farmácia', 'Integral', 'Bacharelado'),
('Fisioterapia', 'Integral', 'Bacharelado'),
('Odontologia', 'Integral', 'Bacharelado'),
('Veterinária', 'Integral', 'Bacharelado'),
('Biologia', 'Noturno', 'Licenciatura'),
('Análise e Desenvolvimento de Sistemas', 'Noturno', 'Tecnológico'),
('Gestão da Tecnologia da Informação', 'Noturno', 'Tecnológico'),
('Gestão de Recursos Humanos', 'Noturno', 'Tecnológico'),
('Logística', 'Noturno', 'Tecnológico'),
('Marketing', 'Noturno', 'Tecnológico'),
('Gestão Financeira', 'Noturno', 'Tecnológico'),
('Processos Gerenciais', 'Noturno', 'Tecnológico'),
('Design Gráfico', 'Noturno', 'Tecnológico'),
('Banco de Dados', 'Noturno', 'Tecnológico'),
('Redes de Computadores', 'Noturno', 'Tecnológico');

-- ======================
-- STORED PROCEDURES
-- ======================

DELIMITER $$

CREATE PROCEDURE sp_inserir_usuario(
    IN p_num_matricula INT,
    IN p_email VARCHAR(100),
    IN p_cpf VARCHAR(11),
    IN p_senha VARCHAR(255),
    IN p_nome VARCHAR(100),
    IN p_data_nascimento DATE,
    IN p_sexo CHAR(1),
    IN p_tipo_usuario CHAR(1),
    IN p_cod_curso INT,
    OUT p_cod_usuario INT

)
BEGIN
    INSERT INTO Usuario (Num_matricula, Email, Cpf, Senha, Nome, Data_nascimento, Sexo, Tipo_usuario, Cod_curso)
    VALUES (p_num_matricula, p_email, p_cpf, p_senha, p_nome, p_data_nascimento, p_sexo, p_tipo_usuario, p_cod_curso);

    SET p_cod_usuario = LAST_INSERT_ID();
END$$

CREATE PROCEDURE sp_listar_postagens_usuario(
    IN p_cod_usuario INT
)
BEGIN
    SELECT Cod_postagem, Texto, Data_postagem, Tipo_postagem
    FROM Postagem
    WHERE Cod_usuario = p_cod_usuario
    ORDER BY Data_postagem DESC;
END$$

DELIMITER ;
