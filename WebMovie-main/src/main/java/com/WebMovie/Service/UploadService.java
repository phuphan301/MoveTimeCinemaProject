package com.WebMovie.Service;

import java.io.File;
import java.util.Map;

import org.springframework.web.multipart.MultipartFile;

public interface UploadService {
	public File save(MultipartFile file, String folder);

	public Map uploadImage(MultipartFile file);
}