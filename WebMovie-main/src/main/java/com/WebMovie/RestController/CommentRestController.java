package com.WebMovie.RestController;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.WebMovie.Entity.Comment;
import com.WebMovie.Service.CommentSevrice;

@CrossOrigin
@RequestMapping("/api/comment")
@RestController
public class CommentRestController {
	@Autowired
	CommentSevrice commentSevrice;

	@GetMapping("/all")
	List<Comment> getAllComment(){
		return commentSevrice.getAllComment();
	}

	@MessageMapping("/products")
	@SendTo("/topic/product")
	public ResponseEntity<Comment> addComment(@RequestBody Comment comment) {
		commentSevrice.addComment(comment);
		System.out.println("Comment added to the database: " + comment.getID());
		return ResponseEntity.ok(comment);
	}

	@GetMapping("/{id}")
	List<Comment> getCommentByIdMovie(@PathVariable("id") Integer id){
		return commentSevrice.getCommentByIdMovie(id);
	}
}
