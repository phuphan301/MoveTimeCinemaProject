package com.WebMovie.Service;

import java.util.Map;

public interface ThymeleafService {
	String creatContent(String template, Map<String, Object> variables);
}
