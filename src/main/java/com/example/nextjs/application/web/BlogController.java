package com.example.nextjs.application.web;

import com.example.nextjs.application.domain.blog.post.BlogPostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.client.HttpServerErrorException;

/**
 * Simple controller for loading blog post homepage and blog post detail.
 */
@Controller
@RequiredArgsConstructor
public class BlogController
{
	private final BlogPostRepository blogPostRepository;

	@GetMapping("/")
	public String homepage( @PageableDefault(size = 3) Pageable pageable, Model model ) {
		model.addAttribute(
				"blogsPage",
				blogPostRepository.findByPublicationSettings_PublishedIsTrueOrderByPublicationSettings_PublicationDateDesc( pageable )
		);

		return "th/nextjs/homepage";
	}

	@GetMapping("/post/{blogId}")
	public String blogPost( @PathVariable long blogId, Model model ) {
		model.addAttribute( "post", blogPostRepository.findById( blogId )
				.orElseThrow(() -> new HttpServerErrorException(HttpStatus.NOT_FOUND, "Blog not found") ) );
		return "th/nextjs/blog-post";
	}
}
