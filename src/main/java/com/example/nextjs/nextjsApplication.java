package com.example.nextjs;

import com.foreach.across.AcrossApplicationRunner;
import com.foreach.across.config.AcrossApplication;
import com.foreach.across.modules.web.AcrossWebModule;
import com.foreach.across.modules.adminweb.AdminWebModule;
import com.foreach.across.modules.debugweb.DebugWebModule;
import com.foreach.across.modules.logging.LoggingModule;
import com.foreach.across.modules.applicationinfo.ApplicationInfoModule;
import com.foreach.across.modules.hibernate.jpa.AcrossHibernateJpaModule;
import com.foreach.across.modules.user.UserModule;
import com.foreach.across.modules.entity.EntityModule;
import com.foreach.across.modules.webcms.WebCmsModule;
import org.springframework.data.web.config.EnableSpringDataWebSupport;

@AcrossApplication(
		modules = {
				AcrossWebModule.NAME,
				AdminWebModule.NAME,
				DebugWebModule.NAME,
				LoggingModule.NAME,
				ApplicationInfoModule.NAME,
				AcrossHibernateJpaModule.NAME,
				UserModule.NAME,
				EntityModule.NAME,
				WebCmsModule.NAME
		}
)
public class nextjsApplication
{
	public static void main( String[] args ) {
		AcrossApplicationRunner.run( nextjsApplication.class, args );
	}
}
