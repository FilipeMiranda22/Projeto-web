ALTER TABLE carros
ADD COLUMN user_id BIGINT; -- Assumindo que user_id será do tipo BIGINT

-- Agora, você pode adicionar a restrição de chave estrangeira
ALTER TABLE carros
ADD CONSTRAINT fk_user_id
FOREIGN KEY (user_id) REFERENCES usuarios(id);