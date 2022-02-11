package com.fr.solution.theme.sky;

import com.fr.stable.fun.impl.AbstractLocaleFinder;
/**
 * 
 * @className LocaleFinder.java
 * @time   2017年9月4日 上午11:35:57
 * @author zuoqb
 * @todo   TODO
 */
public class LocaleFinder extends AbstractLocaleFinder
{
  private String path = LocaleFinder.class.getPackage().getName().replaceAll("\\.", "/");

  public int currentAPILevel()
  {
    return 1;
  }

  public String find()
  {
    return this.path + "/i18n";
  }
}
