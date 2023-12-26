package com.WebMovie.ImplService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.WebMovie.Entity.Comment;
import com.WebMovie.Repository.CommentReporitory;
import com.WebMovie.Service.CommentSevrice;

@Service
public class CommentServiceImpl implements CommentSevrice{
	@Autowired
	CommentReporitory commentReporitory;

	@Override
	public List<Comment> getAllComment() {
		// TODO Auto-generated method stub
		return commentReporitory.findAll();
	}

	@Override
	public Comment addComment(Comment comment) {
		// TODO Auto-generated method stub
		return commentReporitory.save(comment);
	}

	@Override
	public List<Comment> getCommentByIdMovie(Integer id) {
		// TODO Auto-generated method stub
		return commentReporitory.getCommentByIdMovie(id);
	}

}
