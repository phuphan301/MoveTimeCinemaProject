package com.WebMovie.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.WebMovie.Entity.Comment;

public interface CommentReporitory extends JpaRepository<Comment, Integer>{
	@Query("select c from Comment c, Movie v where c.ID_MOVIE = v.ID and v.ID = ?1")
	List<Comment> getCommentByIdMovie(Integer id);
}
