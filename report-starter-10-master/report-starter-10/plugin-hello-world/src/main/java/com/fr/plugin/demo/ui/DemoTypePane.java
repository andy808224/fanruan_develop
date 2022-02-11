package com.fr.plugin.demo.ui;

import com.fr.design.gui.ibutton.UIButtonGroup;
import com.fr.extended.chart.ExtendedTypePane;
import com.fr.plugin.demo.fun.DemoChart;
import com.fr.plugin.demo.fun.ThemeType;

import javax.swing.JPanel;
import java.awt.Component;

/**
 * Created by shine on 2018/4/19.
 */
public class DemoTypePane extends ExtendedTypePane<DemoChart> {
    private UIButtonGroup buttonGroup;

    @Override
    protected String[] getTypeIconPath() {
        return new String[]{
                "com/fr/plugin/demo/dark.png",
                "com/fr/plugin/demo/white.png"
        };
    }

    @Override
    protected String[] getTypeTipName() {
        return new String[]{
                "深色主题",
                "浅色主题"
        };
    }

    @Override
    protected int getTypeIndex(DemoChart chart) {
        return chart.getThemeType().ordinal();
    }

    @Override
    protected void setType(DemoChart chart, int index) {
        chart.setThemeType(ThemeType.parseInt(index));
    }

    @Override
    protected Component[][] getPaneComponents(JPanel typePane) {
        buttonGroup = new UIButtonGroup(new String[]{"3d", "2d"});
        return new Component[][]{
                new Component[]{typePane},
                new Component[]{buttonGroup}
        };
    }

    @Override
    protected void populate(DemoChart chart) {
        super.populate(chart);
        buttonGroup.setSelectedIndex(chart.isThreeDimensional() ? 0 : 1);
    }

    @Override
    protected void update(DemoChart chart) {
        super.update(chart);
        chart.setThreeDimensional(buttonGroup.getSelectedIndex() == 0);
    }
}
