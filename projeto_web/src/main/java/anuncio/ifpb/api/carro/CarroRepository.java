package anuncio.ifpb.api.carro;

import java.util.List;

import anuncio.ifpb.api.usuario.Usuario;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface CarroRepository extends JpaRepository<Carro, Long> {
    @EntityGraph(value = "Carro.anuncio")
    Page<Carro> findAll(Pageable paginacao);
    List<Carro> findByUsuario(Usuario usuario);
}
