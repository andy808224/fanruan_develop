package com.fr.solution.theme.sky;

import com.fr.fs.fun.impl.AbstractThemeVariousProvider;
import com.fr.plugin.ExtraClassManager;
import com.fr.plugin.PluginLicense;
import com.fr.plugin.PluginLicenseManager;
import com.fr.stable.fun.Authorize;
import com.fr.stable.fun.FunctionHelper;
import com.fr.stable.fun.FunctionProcessor;
import com.fr.stable.fun.impl.AbstractFunctionProcessor;
/**
 * 
 * @className ThemeSky.java
 * @time   2017年9月4日 上午11:35:49
 * @author zuoqb
 * @todo   TODO
 */
@Authorize(callSignKey="com.fr.solution.theme.sky")
public class ThemeSky extends AbstractThemeVariousProvider
{
  public static final FunctionProcessor ONEFUNCTION = new AbstractFunctionProcessor()
  {
    public int getId()
    {
      int i = FunctionHelper.generateFunctionID("com.fr.solution.theme.sky");
      return i;
    }

    public String getLocaleKey()
    {
      return "FS-THEME-XBY-TITLE";
    }
  };

  public String name()
  {
    return getText("XBY");
  }

  public String text()
  {
    return getText("西北院主题");
  }

  public String coverPath()
  {
    return getFilePath("/files/cover.png");
  }

  public String scriptPath()
  {
    FunctionProcessor localFunctionProcessor = ExtraClassManager.getInstance().getFunctionProcessor();
    if (localFunctionProcessor != null)
      localFunctionProcessor.recordFunction(ONEFUNCTION);
    return getFilePath("/files/theme.js");
  }

  public String stylePath()
  {
    return getFilePath("/files/style.css");
  }

  private String getFilePath(String paramString)
  {
    PluginLicense localPluginLicense = PluginLicenseManager.getInstance().getPluginLicenseByID("com.fr.solution.theme.sky");
    if (localPluginLicense.isAvailable())
      return Constants.PLUGIN_ROOT + paramString;
    return "";
  }

  private String getText(String paramString)
  {
    PluginLicense localPluginLicense = PluginLicenseManager.getInstance().getPluginLicenseByID("com.fr.solution.theme.sky");
    if (localPluginLicense.isAvailable())
      return paramString;
    return "";
  }
}
