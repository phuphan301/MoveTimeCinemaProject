package com.WebMovie.Service;

import java.util.List;

import com.WebMovie.Entity.Comment;

public interface CommentSevrice {
	List<Comment> getAllComment();
	Comment addComment(Comment comment);
	//Comment updateComment()
	//void deleteComment(Integer id);
	List<Comment> getCommentByIdMovie(Integer id);
}
