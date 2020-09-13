package com.example.nextjs.application.installers;

import com.foreach.across.core.annotations.Installer;
import com.foreach.across.core.installers.InstallerPhase;
import com.foreach.across.modules.webcms.installers.AbstractWebCmsDataInstaller;
import java.util.List;

@Installer(description = "Install default assets for a sample website", phase = InstallerPhase.AfterModuleBootstrap, version = 1)
public class WebCmsDefaultAssetsInstaller extends AbstractWebCmsDataInstaller {
    @Override
    protected void registerResources(List<String> locations) {
        locations.add("classpath:installers/base-content.yml");
    }
}
