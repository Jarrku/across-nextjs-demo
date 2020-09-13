package com.example.nextjs.application.web;

import com.foreach.across.modules.web.events.BuildMenuEvent;
import com.foreach.across.modules.web.menu.Menu;
import com.foreach.across.modules.web.template.ClearTemplate;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

/**
 * Simple controller that maps static pages with or without the layout template applies.
 * This controller also registers some top menu items.
 */
@Controller
public class ExamplePagesController
{
	@EventListener(condition = "#menu.eventName == 'topNav'")
	void registerTopNavMenuItems( BuildMenuEvent<Menu> menu ) {
		menu.builder()
		      .item( "/home", "Home", "/" ).order( 1 ).and()
		      .item( "/about", "About", "/about" ).order( 2 ).and()
			  .item( "/contact", "Contact", "#");
	}
	@GetMapping("/about")
	public String about() {
		return "th/nextjs/about";
	}

	@ClearTemplate
	@GetMapping("/no-layout")
	public String pageWithoutLayout() {
		return "th/nextjs/no-layout";
	}
}