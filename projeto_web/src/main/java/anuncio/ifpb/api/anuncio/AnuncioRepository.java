package anuncio.ifpb.api.anuncio;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface AnuncioRepository extends JpaRepository<Anuncio, Long> {
    @EntityGraph(value = "Anuncio.anunciante-carro")
    Page<Anuncio> findAll(Pageable paginacao);
    List<Anuncio> findByCarroId(Long id);
   
}
